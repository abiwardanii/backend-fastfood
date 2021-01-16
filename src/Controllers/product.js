const model = require("../Models/product");
const respon = require("../Helpers/respon");
const cloudUpload = require("../Helpers/cloudUpload")
const { redisdb } = require("../Config/redis")
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
      const saveToRedis = JSON.stringify(result);
      redisdb.setex("product", 120, saveToRedis);
      return respon(res, 200, result);
    } catch (error) {
      logger.error(error.message);
      return respon(res, 500, error);
    }
  },
  
  getNew: async (req, res) => {
    try {
      const result = await model.getNew();
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
      logger.error(error);
      return response(res, 500, error);
    }
  },

  getFood: async (req, res) => {
    try {
      const result = await model.getFood();
      return respon(res, 200, result);
    } catch (error) {
      logger.error(error.msg);
      return respon(res, 500, error);
    }
  },

  getDrink: async (req, res) => {
    try {
      const result = await model.getDrink();
      return respon(res, 200, result);
    } catch (error) {
      logger.error(error.msg);
      return respon(res, 500, error);
    }
  },

  getHighPrice: async (req, res) => {
    try {
      const result = await model.getHighPrice(req.query);
      return respon(res, 200, result);
    } catch (error) {
      logger.error(error.msg);
      return respon(res, 500, error);
    }
  },
  
  getLowPrice: async (req, res) => {
    try {
      const result = await model.getLowPrice(req.query);
      return respon(res, 200, result);
    } catch (error) {
      logger.error(error.msg);
      return respon(res, 500, error);
    }
  },

  searchMenu: async (req, res) => {
    try {
      const result = await model.searchMenu(req.query);
      return respon(res, 200, result);
    } catch (error) {
      logger.error(error);
      return respon(res, 500, error);
    }
  },

  add: async (req, res) => {
    try {
      if (
        !req.body.product_name ||
        !req.body.product_price ||
        !req.file ||
        !req.body.category_id
      ) {
        logger.warn({
          msg: "you must fill in all the data",
        });
        return respon(res, 200, {
          msg: "you must fill in all the data",
        });
      }
      req.body.product_img = await cloudUpload(req.file.path);
      const result = await model.add(req.body);
      redisdb.del("product");
      return respon(res, 201, result);
    } catch (error) {
      logger.error(error);
      return respon(res, 500, error);
    }
  },

  update: async (req, res) => {
    try {
      if (!req.body.product_id) {
        logger.warn({
          msg: "id not declare",
        });
        return respon(res, 200, {
          msg: "id not declare",
        });
      }
      const dataDB = await model.getId(req.body.product_id);
      if (!dataDB) {
        logger.warn({
          msg: "id not found!",
        });
        return respon(res, 200, {
          msg: "id not found!",
        });
      }
      if (req.file) {
        req.body.product_img = await cloudUpload(req.file.path);
      }

      const result = await model.update(req.body);
      redisdb.del("product");
      return respon(res, 201, result);
    } catch (error) {
      logger.log(error);
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
      redisdb.del("product");
      return respon(res, 200, result);
    } catch (error) {
      logger.log(error.message);
      return respon(res, 500, error);
    }
  },
};