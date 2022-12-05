
const ApiProductos = require("../api/productos.api.js")
class ControladorProductos {

    constructor() {
        this.apiProductos = new ApiProductos()
    }

    obtenerProductos = async (req,res) => {
        try {
     
            let productos = await this.apiProductos.obtenerProductos()
            res.render('index', {
                productos: productos
         
            })
        }
        catch(error) {
            console.log('error Productos', error)
        }
    }
    obtenerProductosId = async (req,res) => {
        try {
            let id = req.params.id
            
            console.log(id)
            let ProductosId = await this.apiProductos.obtenerProductosId(id)

            res.send(ProductosId)
        }
        catch(error) {
            console.log('error Obtener Datos Id', error)
        }
    }
    
    eliminarProductoId = async (req,res) => {
        try {
            let id = req.params.id
            
            console.log(id)
            let ProductosId = await this.apiProductos.eliminarProductoId(id)
    
            res.send(ProductosId)
        }
        catch(error) {
            console.log('error eliminar Datos Id', error)
        }
}
agregarProducto = async (req,res)=>{
    try {
        const {thumbnail,title,price} = req.body
         {thumbnail,title,price}
        await this.apiProductos.agregarProducto({thumbnail:thumbnail,title:title,price:price})
    } catch (error) {
        console.log(error)
    }
}
modificarProducto = async (req,res)=>{
    try {
        
    } catch (error) {
        console.log(error)
    }
}
}




module.exports = ControladorProductos



