const {contenedorArchivoCarrito} = require("../contenedores/contenedorArchivoCarrito.js")

class CarritoDaoArchivo extends contenedorArchivoCarrito{
    constructor(){
       super("./contenedores/carrito.txt")
    }

}
module.exports = {CarritoDaoArchivo}