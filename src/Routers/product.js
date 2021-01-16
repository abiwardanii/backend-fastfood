const express = require("express");
const routes = express.Router();
const ctrl = require("../Controllers/product");
const upload = require("../middleware/Multer")
const validate = require("../middleware/validate")
const cache = require("../middleware/cache")

routes.get("/commit", ctrl.commit);
routes.delete("/drop", ctrl.drop);

routes.get("/",cache,ctrl.getAll);
routes.get("/menu",validate(['admin','customer']),ctrl.getNew);
routes.get("/highprice",validate(['admin','customer']),ctrl.getHighPrice);
routes.get("/lowprice",validate(['admin','customer']),ctrl.getLowPrice);
routes.get("/search",validate(['admin','customer']),ctrl.searchMenu);
routes.get("/food",validate(['admin','customer']),ctrl.getFood);
routes.get("/drink",validate(['admin','customer']),ctrl.getDrink);
routes.get("/:id",validate(["admin", "customer"]),ctrl.getId);
routes.post("/",validate(['admin']),upload.single("product_img"), ctrl.add);
routes.put("/",validate(['admin']),upload.single("product_img"),ctrl.update);
routes.delete("/",validate(['admin']), ctrl.delete);

module.exports = routes;
