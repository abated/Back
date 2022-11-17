const {contenedorMONGODB} = require("../contenedores/contenedorMONGODB.js")

class ProductosDaoMongoDB extends contenedorMONGODB{
    constructor(){
       super()
    }

}
module.exports = {ProductosDaoMongoDB}