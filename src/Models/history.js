const db = require("../Config/db");
const Sequelize = require("sequelize");

class History {
  constructor() {
    this.History = db.sequelize.define("history", {
      id_history: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      amount: {
        type: Sequelize.BIGINT,
        allowNull: false,
      },
      invoice: {
        type: Sequelize.STRING(50),
        allowNull: false,
      },
      cashier: {
        type: Sequelize.STRING(50),
        allowNull: false,
      },
      menu_name: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
    });
  }

  async commit() {
    return new Promise((resolve, reject) => {
      if (process.env.MODE === "DEV") {
        this.History.sync()
          .then(() => {
            resolve("Table historys Created!");
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
        this.History.drop()
          .then(() => {
            resolve("Table historys Deleted!");
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
      this.History.findAll({
        order: [["id_history", "DESC"]],
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

  async add(data) {
    return new Promise((resolve, reject) => {
      this.History.create(data)
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
      this.History.destroy({
        where: {
          id_user: id,
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
      this.History.update(data, {
        where: { id_history: id },
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
module.exports = new History();
