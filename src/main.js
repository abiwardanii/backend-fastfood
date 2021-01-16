const express = require("express");
const routes = express.Router()
const product = require("./Routers/product")
const history = require("./Routers/history")
const category = require("./Routers/Category")
const user = require("./Routers/user")
const auth = require("./Routers/auth")
const { cloudinaryConfig } = require("./Config/cloudinary")

routes.use("*", cloudinaryConfig)
routes.use("/product", product)
routes.use("/history", history)
routes.use("/category", category)
routes.use("/user", user)
routes.use("/auth", auth)

module.exports = routes