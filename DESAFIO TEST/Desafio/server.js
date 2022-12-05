const express = require("express")
const { Server: ServerHttp } = require('http')
const app = express()
const { Server: ServerIo } = require('socket.io')
const serverHttp = new ServerHttp(app)
const io = new ServerIo(serverHttp)
const cors = require("cors")
app.use(express.static(__dirname + '/public'));

app.use(express.json())
app.use(express.urlencoded({extended:true}))
const routerProductos = require("./routes/productos.routes.js")
// import { Server } from 'http'

const  config = require("./config.js")
if (config.NODE_ENV === 'development') {
    app.use(cors())
}

//HandleBars
const handlebars = require("express-handlebars")
app.engine(
    'hbs',
    handlebars.engine({
        extname: '.hbs',
        defaultLayout: '',
        layoutsDir: "C:/Users/Dario/Desktop/Preentrega-AbateDario/views",
        partialsDir:"C:/Users/Dario/Desktop/Preentrega-AbateDario/views/partials"
    })
)
app.set('view engine', 'hbs')
app.set('views', './views')
const routerProductoss =  new routerProductos()

app.use('/api/productos', routerProductoss.start())

const ApiProductos = require("./api/productos.api.js")

app.get("/axios",async(req,res)=>{
    const productos = new ApiProductos()
    const productos2 = await productos.obtenerProductos()
    res.json({
        productos2
 
    })
})






io.on("connection", async (socket) => {
    console.log("SOCKET ON")
    const prods2 =  new ApiProductos
    const mensaje3 = []
    // logger.warn("Socket On")
    const prods = await prods2.obtenerProductos()

    // console.log(mensaje2)
    console.log(prods)
    const mensaje = {
        mensajee: "todo ok",
        prods,
        mensaje3
    }
    socket.emit("mensaje-servidor", mensaje)
    socket.emit("mensaje-servidor2", prods)
    socket.on("mensaje-nuevo", (mensajeChat) => {
        mensaje3.push(mensajeChat)
        // contenedorMensajes.saveFs(mensajeChat)
        io.sockets.emit("mensaje-servidor", mensaje)
    })
    socket.on("producto-nuevo", (productos) => {
        prods.push(productos)
        contenedor.saveMariaDb(productos)
        io.sockets.emit("mensaje-servidor", mensaje)
    })
    socket.on("mensaje-nuevo2", (usuarios) => {
        arraYusuarios.push(usuarios)
    })
})


const port = process.env.PORT || 8000

serverHttp.listen(port, () => {
    console.log('Server is running on port '+port)
})
module.exports=app
// Server.on('error', (error) => {
//     console.log('Error en servidor: ', error)
// })