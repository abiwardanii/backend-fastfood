const db = require("../Config/db");
const Sequelize = require("sequelize");

class User {
  constructor() {
    this.User = db.sequelize.define("user", {
      id_user: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      username: {
        type: Sequelize.STRING(50),
        allowNull: false,
      },
      role: {
        type: Sequelize.STRING(50),
        allowNull: false,
      },
      email: {
        type: Sequelize.STRING(50),
        allowNull: false,
      },
      password: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
    });
  }

  async commit() {
    return new Promise((resolve, reject) => {
      if (process.env.MODE === "DEV") {
        this.User.sync()
          .then(() => {
            resolve("Table user Created!");
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
        this.User.drop()
          .then(() => {
            resolve("Table user Deleted!");
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
      this.User.findAll({
        raw: true,
        order: [["id_user", "DESC"]],
      })
        .then((res) => {
          if (res.length > 0) {
            resolve(res);
          } else {
            resolve("User table is empty");
          }
        })
        .catch((e) => {
          reject(e);
        });
    });
  }

  async getByEmail(email) {
    return new Promise((resolve, reject) => {
      this.User.findOne({
        where: { email: email },
        raw: true,
      })
        .then((res) => {
          resolve(res);
        })
        .catch((e) => {
          console.log(e);
          reject(e);
        });
    });
  }

  async add(data) {
    return new Promise((resolve, reject) => {
      this.User.create(data)
        .then(() => {
          resolve(data);
        })
        .catch((e) => {
          console.log(e);
          reject(e);
        });
    });
  }

  async update(data) {
    return new Promise((resolve, reject) => {
      this.User.update(data, { where: { email: data.email } })
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

  async delete(email) {
    return new Promise((resolve, reject) => {
      this.User.destroy({
        where: email,
      })
        .then(() => {
          resolve({
            msg: "User deleted !",
          });
        })
        .catch((e) => {
          reject(e);
        });
    });
  }
}

module.exports = new User();
