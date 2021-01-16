const db = require("../Config/db");
const Sequelize = require("sequelize");
const { Op } = require("sequelize");
const category_tb = require("./Category");

class Product {
  constructor() {
    this.Product = db.sequelize.define("products", {
      product_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      product_name: {
        type: Sequelize.STRING(50),
        allowNull: false,
      },
      product_price: {
        type: Sequelize.BIGINT,
        allowNull: false,
      },
      product_img: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      category_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: "categorys",
          key: "id",
        },
      },
    });
    this.Product.belongsTo(category_tb.Category, {
      foreignKey: "category_id",
    });
  }

  async commit() {
    return new Promise((resolve, reject) => {
      if (process.env.MODE === "DEV") {
        this.Product.sync()
          .then(() => {
            resolve("Table Product Created!");
          })
          .catch((e) => {
            reject(e);
          });
      } else {
        reject("You don't have access");
      }
    });
  }

  async drop() {
    return new Promise((resolve, reject) => {
      if (process.env.MODE === "DEV") {
        this.Product.drop()
          .then(() => {
            resolve("Table Product Deleted!");
          })
          .catch((e) => {
            reject(e);
          });
      } else {
        reject("You don't have access");
      }
    });
  }

  async add(data) {
    return new Promise((resolve, reject) => {
      this.Product.create(data)
        .then(() => {
          resolve(data);
        })
        .catch((e) => {
          reject(e);
        });
    });
  }

  async getAll() {
    return new Promise((resolve, reject) => {
      this.Product.findAll({
        raw: true,
        order: [["product_id", "ASC"]],
        include: [
          {
            model: category_tb.Category,
          },
        ],
      })
        .then((res) => {
          if (res.length > 0) {
            resolve(res);
          } else {
            resolve("Product table is empty");
          }
        })
        .catch((e) => {
          reject(e);
        });
    });
  }
  
  async getId(id) {
    return new Promise((resolve, reject) => {
      this.Product.findOne({
        where: {
          product_id: id,
        },
        raw: true,
      })
        .then((res) => {
          resolve(res);
        })
        .catch((e) => {
          reject(e);
        });
    });
  }

  async getNew() {
    return new Promise((resolve, reject) => {
      this.Product.findAll({
        raw: true,
        order: [["product_id", "DESC"]],
        include: [
          {
            model: category_tb.Category,
          },
        ],
      })
        .then((res) => {
          if (res.length > 0) {
            resolve(res);
          } else {
            resolve("Product table is empty");
          }
        })
        .catch((e) => {
          reject(e);
        });
    });
  }

  async getLowPrice() {
    return new Promise((resolve, reject) => {
      this.Product.findAll({
        raw: true,
        order: [["product_price", "ASC"]],
        include: [
          {
            model: category_tb.Category,
          },
        ],
      })
        .then((res) => {
          resolve(res);
        })
        .catch((e) => {
          reject(e);
        });
    });
  }
  async getHighPrice() {
    return new Promise((resolve, reject) => {
      this.Product.findAll({
        raw: true,
        order: [["product_price", "DESC"]],
        include: [
          {
            model: category_tb.Category,
          },
        ],
      })
        .then((res) => {
          resolve(res);
        })
        .catch((e) => {
          reject(e);
        });
    });
  }

  async getFood() {
    return new Promise((resolve, reject) => {
      this.Product.findAll({
        raw: true,
        where:{
          category_id : 1
        },
        order: [["product_id", "DESC"]],
        include: [
          {
            model: category_tb.Category,
          },
        ],
      })
        .then((res) => {
          resolve(res);
        })
        .catch((e) => {
          reject(e);
        });
    });
  }

  async getDrink() {
    return new Promise((resolve, reject) => {
      this.Product.findAll({
        raw: true,
        order: [["product_id", "DESC"]],
        where:{
          category_id : 2
        },
        include: [
          {
            model: category_tb.Category,
          },
        ],
      })
        .then((res) => {
          resolve(res);
        })
        .catch((e) => {
          reject(e);
        });
    });
  }

  async searchMenu(data) {
    const menuKey = Object.keys(data).toString();
    const menuValue = Object.values(data).toString();
    return new Promise((resolve, reject) => {
      this.Product.findAll({
        where: {
          [menuKey]: {
            [Op.iLike]: `%${menuValue}%`,
          },
        },
        raw: true,
        order: [["product_id", "DESC"]],
        include: [
          {
            model: category_tb.Category,
          },
        ],
      })
        .then((res) => {
          resolve(res);
        })
        .catch((e) => {
          if (e.parent.hint) {
            reject(e.parent.hint);
          } else {
            reject(e);
          }
        });
    });
  }

  async update(data) {
    return new Promise((resolve, reject) => {
      this.Product.update(data, { where: { product_id: data.product_id } })
        .then((res) => {
          if (res == 0) {
            reject(res);
          } else {
            resolve(res);
          }
        })
        .catch((e) => {
          reject(e);
        });
    });
  }

  async delete(id) {
    return new Promise((resolve, reject) => {
      this.Product.destroy({
        where: { product_id: id },
      })
        .then(() => {
          resolve({
            msg: "Product deleted !",
          });
        })
        .catch((e) => {
          reject(e);
        });
    });
  }
}
module.exports = new Product();
