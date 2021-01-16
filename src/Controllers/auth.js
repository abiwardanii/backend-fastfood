const bcr = require("bcrypt");
const model = require("../Models/user");
const respon = require("../Helpers/respon");
const jwt = require("jsonwebtoken");
const logger = require("../Config/winston");

class Auth {
  login = async (req, res) => {
    try {
      const passDB = await model.getByEmail(req.body.email);
      if (!passDB) {
        logger.warn({msg:"Email has not been registered"})
        return respon(res, 200, { msg: "Email has not been registered" });
      }
      
      const passUser = req.body.password;
      const checkPass = await bcr.compare(passUser, passDB.password);
      if (checkPass) {
        const result = await this.setToken(passDB.email, passDB.role);
        return respon(res, 200, result);
      } else {
        logger.warn({msg:"Password Incorrect"})
        return respon(res, 200, { msg: "Password Incorrect" });
      }
    } catch (error) {
      logger.warn(error.msg)
      return respon(res, 500, error);
    }
  };

  setToken = async (email,role) => {
    try {
      const payload = {
        email: email,
        role: role,
      };

      const token = jwt.sign(payload, process.env.JWT_KEYS, {expiresIn: "1d"});

      const result = {
        msg: "Token created",
        token: token,
        role: role,
      };
      return result;
    } catch (error) {
      throw error;
    }
  };
}
module.exports = new Auth();
