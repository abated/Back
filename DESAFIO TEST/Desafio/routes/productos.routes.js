
const {Router} = require("express")
const ControladorProductos = require("../controllers/producto.controllers.js")
class routerProductos {
    constructor() {
        this.controladoresProductos = new ControladorProductos()
        this.router = Router()
    }

    start() {
        this.router.get('/', this.controladoresProductos.obtenerProductos)
        this.router.get('/:id', this.controladoresProductos.obtenerProductosId)
        this.router.delete('/:id',this.controladoresProductos.eliminarProductoId)
        this.router.post('/',this.controladoresProductos.agregarProducto)
        this.router.put('/',this.controladoresProductos.modificarProducto)
        return this.router
    }
}
module.exports = routerProductos