const respone = require("../Helpers/respon")
const { redisdb } = require("../Config/redis")

const getAll = (req, res, next) => {
    redisdb.get("product", (err, data) => {
        if (err) {
            return respone(res, 500, err)
        }

        if (data !== null) {
            const result = JSON.parse(data)
            return respone(res, 200, result)
        } else {
            next()
        }
    })
}

module.exports = getAll
