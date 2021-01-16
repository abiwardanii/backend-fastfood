const model = require("../Models/user");
const respon = require("../Helpers/respon");
const hashPassword = require("../Helpers/hash");
const logger = require("../Config/winston");

class User {
  async commit(req, res) {
    try {
      const result = await model.commit();
      if (result == "Table user Created!") {
        const fromDB = await model.getByEmail("owner@gmail.com");
        if (fromDB) {
          logger.warn({
            msg: "This email is already registered!",
          });
        } else {
          const newPassword = await hashPassword("pemilikresto");
          const data = {
            username: "owner",
            email: "owner@gmail.com",
            password: newPassword,
            role: "admin",
          };
          await model.add(data);
          logger.info({
            msg: "Admin user created!",
          });
        }
      }
      return respon(res, 200, result);
    } catch (error) {
      return respon(res, 500, error);
    }
  }
  async drop(req, res) {
    try {
      const result = await model.drop();
      return respon(res, 200, result);
    } catch (error) {
      return respon(res, 500, error);
    }
  }

  async add(req, res) {
    try {
      const dataUser = req.body;
      if(dataUser.role === undefined){
        dataUser.role = "customer";
      }
      const checkEmail = await model.getByEmail(req.body.email);

      if (checkEmail) {
        logger.warn({msg:"Email is already registered, please login"})
        return respon(res, 401, { msg: "Email is already registered, please login" });
      }

      const newPassword = await hashPassword(req.body.password);
      const user = {
        username: req.body.username,
        email: req.body.email,
        role: req.body.role,
        password: newPassword,
      };
      const data = await model.add(user);
      return respon(res, 200, data);
    } catch (error) {
      logger.warn(error.msg)
      // return respon(res, 500, error);
      console.log(error);
    }
  }
 
  async getAll(req, res) {
    try {
      const result = await model.getAll();
      return respon(res, 200, result);
    } catch (error) {
      logger.warn(error.msg)
      // return respon(res, 500, error);
      console.log(error);
    }
  }

  async update(req, res) {
    try {
      const dataDB = await model.getByEmail(req.body.email);
      if (!dataDB) {
        logger.warn({
          msg: "User not found!",
        });
        return respon(res, 200, {
          msg: "User not found!",
        });
      }
      if (req.body.password) {
        const newPassword = await hashPassword(req.body.password);
        req.body.password = newPassword;
      }
      const result = await model.update(req.body);
      return respon(res, 200, result);
    } catch (error) {
      logger.error(error);
      return respon(res, 500, error);
    }
  }
  
  async delete(req, res) {
    try {
      if (!req.query.email) {
        logger.warn({
          msg: "request rejected",
        });
        return respon(res, 200, {
          msg: "request rejected",
        });
      }
      const dataDB = await model.getByEmail(req.query.email);
      if (!dataDB) {
        logger.warn({
          msg: "User not found!",
        });
        return respon(res, 200, {
          msg: "User not found!",
        });
      }
      const result = await model.delete(req.query);
      return respon(res, 200, result);
    } catch (error) {
      return respon(res, 500, error);
    }
  }
}
module.exports = new User();
