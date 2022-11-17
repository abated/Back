const {response} = require("express")
const {ProductosDaoArchivo} = require("../../ProductosDao/ProductosDaoArchivo.js")

const Users = require("../../usuario.model.js")
const contenedor = new ProductosDaoArchivo("./contenedores/productos.txt")

const getProducts2 = async(req,res = response)=>{

        const productos = await contenedor.getAll()
        res.render('productos',{
            productos:productos
        }
        )
    }
const getProducts = async(req,res = response)=>{
const usuario = req.session.passport.user
// console.log(usuario)

    const elementos = await Users.findOne({_id:usuario})
    // console.log(elementos)

    const productos = await contenedor.getAll()
    res.render('index', {
        administrador: true,
        mensaje: `hola ${elementos.username}`,
        productos: productos,
        avatar:elementos.avatar
        // mensajes: mensajes,
        // usuarioModelo:usuarioModelo
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
        const {thumbnail,title,price} = req.body
        contenedor.save({thumbnail,title,price})
        res.json({
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
module.exports = {getProducts,getId,postProduct,putProduct,deleteId,getProducts2}