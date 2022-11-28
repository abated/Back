
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

}
module.exports = ApiProductos
