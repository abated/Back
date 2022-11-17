const express = require("express")
const {getProducts2,getId,postProduct,putProduct,deleteId} = require("../controllers/carrito.controller.js")


const {Router}  = express

const routerCarrito = Router()

routerCarrito.get("/",getProducts2)
routerCarrito.get("/:id",getId)
routerCarrito.post("/",postProduct)
routerCarrito.put("/:id",putProduct)
routerCarrito.delete("/:id",deleteId)

module.exports = routerCarrito