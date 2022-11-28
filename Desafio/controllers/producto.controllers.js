
const ApiProductos = require("../api/productos.api.js")
class ControladorProductos {

    constructor() {
        this.apiProductos = new ApiProductos()
    }

    obtenerProductos = async (req,res) => {
        try {
     
            let productos = await this.apiProductos.obtenerProductos()
            res.render('index', {
                productos: productos,
         
            })
        }
        catch(error) {
            console.log('error Productos', error)
        }
    }
}


module.exports = ControladorProductos



