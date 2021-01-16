const respon = require("../Helpers/respon");
const jwt = require("jsonwebtoken");

const checkToken = (role) => {
  return function (req, res, next) {
    const { authtoken } = req.headers;
    let isAccsess = false;

    if (!authtoken) {
      const result = {
        msg: "You must login first",
      };
      return respon(res, 401, result);
    }

    jwt.verify(authtoken, process.env.JWT_KEYS, (err, decode) => {
      if (err) {
        return respon(res, 401, err);
      }

      role.map((value) => {
        if (value == decode.role) {
          isAccsess = true;
        }
      });

      if (isAccsess) {
        next();
      } else {
        return respon(res, 401, { msg: "Your not permitted" });
      }
    });
  };
};

module.exports = checkToken;
