const model = require("../Models/Category");
const respon = require("../Helpers/respon");
const logger = require("../Config/winston");

module.exports = {
  commit: async (req, res) => {
    try {
      const result = await model.commit();
      return respon(res, 200, result);
    } catch (error) {
      return respon(res, 500, error);
    }
  },

  drop: async (req, res) => {
    try {
      const result = await model.drop();
      return respon(res, 200, result);
    } catch (error) {
      return respon(res, 500, error);
    }
  },

  getAll: async (req, res) => {
    try {
      const result = await model.getAll();
      return respon(res, 200, result);
    } catch (error) {
      logger.error(error.msg);
      return respon(res, 500, error);
    }
  },

  getId: async (req, res) => {
    try {
      const result = await model.getId(req.params.id);
      return response(res, 200, result);
    } catch (error) {
      logger.error(error.message);
      return response(res, 500, error);
    }
  },

  add: async (req, res) => {
    try {
      if (!req.body.category_name) {
        logger.warn({
          msg: "you must fill in all the data",
        });
        return respon(res, 200, {
          msg: "you must fill in all the data",
        });
      }
      const result = await model.add(req.body);
      return respon(res, 201, result);
    } catch (error) {
      logger.error(error.msg);
      return respon(err, 500, error);
    }
  },

  update: async (req, res) => {
    try {
      console.log(req.body);
      if (!req.body.id) {
        logger.warn({
          msg: "id not declare",
        });
        return respon(res, 200, {
          msg: "id not declare",
        });
      }
      const dataDB = await model.getId(req.body.id);
      if (!dataDB) {
        logger.warn({
          msg: "id not found!",
        });
        return respon(res, 200, {
          msg: "id not found!",
        });
      }
      const result = await model.update(req.body);
      return respon(res, 201, result);
    } catch (error) {
      logger.error(error.msg);
      return respon(res, 500, error);
    }
  },

  delete: async (req, res) => {
    try {
      if (!req.query.id) {
        logger.warn({
          msg: "id not declare",
        });
        return respon(res, 200, {
          msg: "id not declare",
        });
      }
      const dataDB = await model.getId(req.query.id);
      if (!dataDB) {
        logger.warn({
          msg: "id not found!",
        });
        return respon(res, 200, {
          msg: "id not found!",
        });
      }
      const result = await model.delete(req.query.id);
      return respon(res, 200, result);
    } catch (error) {
      logger.error(error.msg);
      return respon(res, 500, error);
    }
  },
};
