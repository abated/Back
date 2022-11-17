const express = require("express")
// const {getProducts,getId,postProduct,putProduct,deleteId} = require("../controllers/productos.controller.js")
const {getProducts,getId,deleteId} = require("../controllers/productos.controllerFirebase.js")

const {Router}  = express

const routerProductos = Router()

routerProductos.get("/",getProducts)
routerProductos.get("/:id",getId)

routerProductos.delete("/:id",deleteId)

module.exports = routerProductos