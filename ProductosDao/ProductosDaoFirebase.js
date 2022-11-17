const {contenedorFirebase} = require("../contenedores/contenedorFirebase.js")

class ProductosDaoFirebase extends contenedorFirebase{
    constructor(){
       super()
    }

}
module.exports = {ProductosDaoFirebase}