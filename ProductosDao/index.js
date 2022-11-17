let carritoDao

switch  (process.env.PERS) {
    case "json":
        const {default:ProductoDaoArchivo} =  import("./ProductosDaoArchivo.js")
        productosDao = new ProductoDaoArchivo()
        
        break;
        case "Mongodb":
            const {default:ProductosDaoMongoDB} =  import("./ProductosDaoMongoDB.js")
            productosDao = new ProductosDaoMongoDB()
            
            break;
   
            case "Firebase":
                const {default:ProductosDaoFirebase} =  import("./ProductosDaoFirebase.js")
                productosDao = new ProductosDaoFirebase()
                
                break;
}
  module.exports = productosDao