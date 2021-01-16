const express = require("express");
const routes = express.Router();
const ctrl = require("../Controllers/user");
const validate = require("../middleware/validate");

routes.get("/commit", ctrl.commit);
routes.delete("/drop", ctrl.drop);

routes.get("/", ctrl.getAll);
routes.post("/", ctrl.add);
routes.put("/", validate(["admin"]), ctrl.update);
routes.delete("/", validate(["admin"]), ctrl.delete);

module.exports = routes;