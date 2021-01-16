const express = require("express");
const routes = express.Router();
const ctrl = require("../Controllers/history");
const validate = require("../middleware/validate")

routes.get("/commit", ctrl.commit);
routes.delete("/drop", ctrl.drop);

routes.get("/",validate(['admin']),ctrl.getAll);
routes.get("/:id", validate(["admin", "customer"]), ctrl.getId);
routes.post("/", validate(["admin", "customer"]), ctrl.add);
routes.put("/", validate(["admin"]), ctrl.update);
routes.delete("/", validate(["admin"]), ctrl.delete);

module.exports = routes;
