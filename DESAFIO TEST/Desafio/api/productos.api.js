
const config = require("../config.js")

const ProductoFactoryDAO = require("../model/DAOs/productosFactory.js")


// _________________________capa de negocio____________________//

class ApiProductos {

    constructor() {
        this.productoDAO = ProductoFactoryDAO.get(config.TIPO_PERSISTENCIA)
    }

    async obtenerProductos() { 
        return await this.productoDAO.obtenerProductos()
    }
    async obtenerProductosId(id) { 
        return await this.productoDAO.obtenerProductosId(id)
    }
    async eliminarProductoId(id){
        return await this.productoDAO.eliminarProductoId(id)
    }
    async agregarProducto({thumbnail:thumbnail,title:title,price:price}){
        return await this.productoDAO.agregarProducto({thumbnail:thumbnail,title:title,price:price})
    }
}
module.exports = ApiProductos
