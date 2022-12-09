// const { default: noticiaDTO } = require("../DTOs/noticias.DTOs");
// const { default: NoticiasBaseDAO } = require("./noticiasBaseDao");
const mongoose = require("mongoose")
const {ObjectId} = mongoose.Types
const productos = require("../../producto.model.js")


class ProductosDBMongoDAO  {
    constructor(database, collection) {
       
       ;(async () => {
        try {
            // const url = 'mongodb://localhost:27017/ecommerce'
            const url = "mongodb+srv://dario:1164945700@cluster0.vqbfuks.mongodb.net/?retryWrites=true&w=majority"
            process.env.MONGODB_CONNECT
            // const url = process.env.MONGODB_CONNECT
            await mongoose.connect(url,{
                useNewUrlParser: true,
                useUnifiedTopology: true,
            })
            console.log('MongoDB connected')
        } catch (error) {
            console.error(error)
        }
        })()
    }

    async obtenerProductos(){
        try {
           
          const  resultado = await productos.find()
   
            return resultado
        } catch (error) {
            console.log(`error Obtener Productos ${error}`)
        }
    }
    
    async obtenerProductosId(_id){
        try {
           
            if (_id) {
                console.log(_id)
                const producto = await productos.findOne({ _id: ObjectId(_id) })
                console.log(producto)
                return [producto]
            } else {
                return await productos.find({}).toArray()
            }
        } catch (error) {
            console.log('error obtenerProductos ID', error)            
        }
    }
    async eliminarProductoId(_id){
        
        try {
            if(_id){
                const producto = await productos.deleteOne({ _id: ObjectId(_id) })
                console.log(`${producto} eliminado`)
            }
            
        } catch (error) {
            console.log(error)
        }
    }
    async agregarProducto({thumbnail,title,price}){
        try {
            let doc = await productos.insertMany({thumbnail:thumbnail,title:title,price:price});
            console.log(`doc agregado${doc}`)
        } catch (error) {
            console.log(error)
        }
    }
}


module.exports = ProductosDBMongoDAO
