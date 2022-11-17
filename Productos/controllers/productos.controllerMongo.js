const {response} = require("express")
const {ProductosDaoMongoDB} = require("../../ProductosDao/ProductosDaoMongoDB.js")



const contenedor = new ProductosDaoMongoDB()
const getProducts = async(req,res = response)=>{
    const usuarios =  await contenedor.getProducts()
    console.log(usuarios)
    res.json({
        usuarios
    })
}

const getId = async(req,res = response) =>{
    try {
        const {id} = req.params
        const usuarios =  await contenedor.getId(id)
         res.json({
            usuarios
         })
    } catch (error) {
        res.json({
            error
        })  
    }
}
const deleteId = async (req,res = response)=>{
    try {
        const {id} = req.params
        const usuarios =  await contenedor.deleteId(id)
       res.json({
        usuarios
       })
    } catch (error) {
        res.json({
            error
        })
    }
}
module.exports = {getProducts,getId,deleteId}