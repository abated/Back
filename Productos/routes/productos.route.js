const express = require("express")
const {getProducts,getId,postProduct,putProduct,deleteId,iniciar,faillogin,failsignup,signup} = require("../controllers/productos.controller.js")
const checkAuth = (req, res, next) => {
    if (req.isAuthenticated()) {
        next()
        
    }else{
        res.redirect('/login')
      
    }
}

const {Router}  = express

const routerProductos = Router()
routerProductos.get("/signup",signup)
routerProductos.get("/failsignup",failsignup)
routerProductos.get("/faillogin",faillogin)
routerProductos.get("/iniciar",iniciar)
routerProductos.get("/",checkAuth,getProducts)
routerProductos.get("/:id",getId)
routerProductos.post("/",postProduct)
routerProductos.put("/:id",putProduct)
routerProductos.delete("/:id",deleteId)

module.exports = routerProductos