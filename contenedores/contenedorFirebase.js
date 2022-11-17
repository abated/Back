const connectDBFirebase = require("../configFirebase")
var admin = require("firebase-admin");

var serviceAccount = require("../backdario-firebase-adminsdk-aymn5-6495ddd102.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
})
const db = admin.firestore()
    query = db.collection('usuarios')

connectDBFirebase()

const hora = new Date().getTime()
class contenedorFirebase {
    constructor(ruta,tabla) {
        this.ruta = ruta
        this.tabla = tabla
        
    }
    async getProducts() {
        try {
            const queryRead = await query.get()
            const respuesta = queryRead.docs.map(document => ({id: document.id,...document.data()}))
           return respuesta
        } catch (error) {
            console.log(error)
        }
    }
    async getId(id){
        try {
           
          const doc = query.doc(`${id}`)
          const item = await doc.get()
          const resultado = item.data()
            return resultado
        } catch (error) {
            console.log(error)
        }
    }
    async deleteId(id) {
        try {
            const doc = query.doc(`${id}`)
            const item = await doc.delete()
              console.log(`el item ${item} ha sido eliminado`)
          } catch (error) {
              console.log(error)
          }
    }
}
module.exports = {contenedorFirebase}