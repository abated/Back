const {contenedorArchivo} = require("../contenedores/contenedorArchivo.js")

class ProductosDaoArchivo extends contenedorArchivo{
    constructor(){
       super("./contenedores/productos.txt")
    }

}
module.exports = {ProductosDaoArchivo}