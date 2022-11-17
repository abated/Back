const Users = require("../models/usuarios.model.js")
const connectDB = require("../MongoDB/conexionDB.js")
connectDB()

const hora = new Date().getTime()
class contenedorMONGODB {
    constructor(ruta,tabla) {
        this.ruta = ruta
        this.tabla = tabla
        
    }
    async getProducts() {
        try {
            const usuarios = await Users.find()  
        return usuarios
        } catch (error) {
            console.log(error)
        }
    }
    async getId(id){
        try {
           
          const  resultado = await Users.find({_id:{$eq:id}})
          
            return resultado
        } catch (error) {
            console.log(error)
        }
    }
    async deleteId(id) {
        try {
            const  resultado = await Users.deleteOne({_id:{$eq:id}})
              return resultado
          } catch (error) {
              console.log(error)
          }
    }
}
module.exports = {contenedorMONGODB}