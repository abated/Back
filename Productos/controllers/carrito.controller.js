const {response} = require("express")
const {CarritoDaoArchivo} = require("../../CarritoDao/CarritoDaoArchivo.js")

const contenedor = new CarritoDaoArchivo("./contenedores/carrito.txt")
const getProducts2 = async(req,res = response)=>{
    const productos = await contenedor.getAll()
    res.json({
        productos
    })
}

const getId = async(req,res = response) =>{
    try {
        const {id} = req.params
        console.log(req.params)
         const idNumber = Number(id)
         const ProductoById = await contenedor.getById(idNumber)
         res.json({
              ProductoById
         })
        
    } catch (error) {
        res.json({
            error
        })
        
    }
}

const postProduct = async(req,res = response) =>{
    try {
        console.log(req)
        
        const {thumbnail,title,price} = req.body
        console.log(thumbnail,title,price)
        contenedor.save({thumbnail,title,price})
        res.render("carrito",{
            thumbnail,
            price,
            title
        })
        
    } catch (error) {
        res.json({
            error
        })
    }
}

const putProduct = async (req,res = response) =>{
    try {
        const objetoProducto = req.body
        const {id} = req.params
        const respuesta = await contenedor.updateById({id:parseInt(id),...objetoProducto})
        res.json({
            respuesta
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
        const idNumber = Number(id)
        const respuesta = await contenedor.deleteById(idNumber)
       res.json({
        respuesta
       })
    } catch (error) {
        res.json({
            error
        })
    }
}
module.exports = {getProducts2,getId,postProduct,putProduct,deleteId}