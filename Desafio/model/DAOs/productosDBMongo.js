// const { default: noticiaDTO } = require("../DTOs/noticias.DTOs");
// const { default: NoticiasBaseDAO } = require("./noticiasBaseDao");
const mongoose = require("mongoose")
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
            console.log(error)
        }
    }

}
module.exports = ProductosDBMongoDAO


