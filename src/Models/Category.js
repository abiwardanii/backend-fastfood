const db = require("../Config/db");
const Sequelize = require("sequelize");

class Category {
  constructor() {
    this.Category = db.sequelize.define("categorys", {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      category_name: {
        type: Sequelize.STRING(50),
        allowNull: false,
      },
    });
  }

  async commit() {
    return new Promise((resolve, reject) => {
      if (process.env.MODE === "DEV") {
        this.Category.sync()
          .then(() => {
            resolve("Table categorys Created!");
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
        this.Category.drop()
          .then(() => {
            resolve("Table category Deleted!");
          })
          .catch((e) => {
            reject(e);
          });
      } else {
        reject("You don't have access");
      }
    });
  }

  async getAll() {
    return new Promise((resolve, reject) => {
      this.Category.findAll({
        order: [["id", "DESC"]],
      })
        .then((res) => {
          if (res.length > 0) {
            resolve(res);
          } else {
            resolve(null);
          }
        })
        .catch((err) => {
          reject(err);
        });
    });
  }

  async getId(id) {
    return new Promise((resolve, reject) => {
      this.Category.findOne({
        where: {
          id: id,
        },
        raw: true,
      })
        .then((res) => {
          resolve(res);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }
  
  async add(data) {
    return new Promise((resolve, reject) => {
      this.Category.create(data)
        .then(() => {
          resolve(data);
        })
        .catch((e) => {
          reject(e);
        });
    });
  }

  async delete(id) {
    return new Promise((resolve, reject) => {
      this.Category.destroy({
        where: {
          id: id,
        },
      })
        .then(() => {
          resolve("Data deleted !");
        })
        .catch((e) => {
          reject(e);
        });
    });
  }

  async update(data) {
    return new Promise((resolve, reject) => {
      this.Category.update(data, {
        where: { id: data.id },
      })
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
}
module.exports = new Category();