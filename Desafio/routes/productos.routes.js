
const {Router} = require("express")
const ControladorProductos = require("../controllers/producto.controllers.js")
class routerProductos {
    constructor() {
        this.controladoresProductos = new ControladorProductos()
        this.router = Router()
    }

    start() {
        this.router.get('/', this.controladoresProductos.obtenerProductos)
        return this.router
    }
}
module.exports = routerProductos