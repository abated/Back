
const ProductosDBMongoDAO = require("../DAOs/productosDBMongo.js")



class ProductosFactoryDAO {

    static get(tipo) {
        switch (tipo) {
           
            case 'MONGO':
                return new ProductosDBMongoDAO()
            default:
                return new ProductosDBMongoDAO()
        }
    }
}   

module.exports = ProductosFactoryDAO