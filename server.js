const express = require("express")

const { Server: ServerHttp } = require('http')
const app = express()
const { Server: ServerIo } = require('socket.io')
const serverHttp = new ServerHttp(app)
const io = new ServerIo(serverHttp)
const session = require("express-session")
const passport = require("passport")
const LocalStrategy = require('passport-local').Strategy
const connectdB = require("./conexionDb.js")
const {createTransport} = require("nodemailer")
const Users = require("./usuario.model.js")
const bcrypt = require("bcrypt")
app.use(express.static(__dirname + '/public'));
app.use(express.json())
app.use(express.urlencoded({extended:true}))
const dotenv = require("dotenv")
const  logger  = require("./logger.js")
dotenv.config() 
//session
app.use(express.json())
const cookieParser = require("cookie-parser")
app.use(cookieParser())
const isValidPassword = (user, password) => {
    return bcrypt.compareSync(password, user.password)
}

const {contenedorArchivo} = require("./contenedores/contenedorArchivo.js")
const contenedor = new contenedorArchivo("./contenedores/productos.txt")
// //CLUSTER
const CLUSTER = require("./modoCluster.js")

const modoCluster = process.argv[2]
console.log(process.argv[2])

CLUSTER(modoCluster);

app.use(session({
    secret: 'keyboard cat',
    cookie: {
      httpOnly: false,
      secure: false,
      maxAge: 100000
    },
    rolling: true,
    resave: true,
    saveUninitialized: false
   }));


//PASSPORT
app.use(passport.initialize())
app.use(passport.session())
connectdB()

//FS SYSTEM
const routerProductos = require("./Productos/routes/productos.route.js")
const routerCarrito = require("./Productos/routes/carrito.route.js")

//MONGO DB
// const routerProductos = require("./Productos/routes/productos.routeMongoDB.js")

//Firebase
// const routerProductos = require("./Productos/routes/productos.routeFirebase.js")
const handlebars = require("express-handlebars")
//whatsap twilio



const twilio = require("twilio")

const accountSid = process.env.accountSid
const authToken = process.env.authToken

const client = twilio(accountSid, authToken)
// const options = {
//    body: ` Compraste${carrito} a pedido de`,
//    mediaUrl: [ 'https://www.chetu.com/img/twilio/partner/twilio-logo.png' ],
//    from: 'whatsapp:+14155238886',
//    to: 'whatsapp:+5491151652403'
// }
// ;(async () => {
//    try {
//        const message = await client.messages.create(options)
//        console.log(message)
//    } catch (error) {
//        console.log(error)
//    }
// })()
//passport MidleWare
passport.use('login', new LocalStrategy(
    (username, password, done) => {
       Users.findOne({ username }, (err, user) => {
      
        if (err)
          return done(err);
   
        if (!user) {
         
          
          logger.error('User Not Found with username ' + username)
          return done(null, false);
        }
   
        if (!isValidPassword(user, password)) {
            logger.error("Invalid Password")
        
          return done(null, false);
        }
        return done(null, user);
    });
    
})
   );
 
   passport.use('signup', new LocalStrategy({
    passReqToCallback: true
}, (req, username, password, done) => {
    Users.findOne({ 'username': username }, function (err, user) {
        const { email,nombre,direccion,edad,telefono,avatar } = req.body
        if (err) {
            logger.error('Error in SignUp: ' + err);
        
          return done(err);
        }
        if (user) {
            logger.error('User already exists');
          return done(null, false)
        }
    let newUser = {
        username,
        password: createHash(password),
        email,
        nombre,
        direccion,
        edad,
        telefono,
        avatar
    }
    const TEST_MAIL = 'dario.tasa@gmail.com'

const transporter = createTransport({
   service: 'gmail',
   port: 587,
   auth: {
       user: TEST_MAIL,
       pass: 'ttdkjczkisftsslv'
   }
});

    Users.create(newUser, (err, userWithId) => {
        if (err) {
            logger.error('Error in Saving user: ' + err)
          return done(err);
        }

        logger.info(user)
      logger.info('User Registration succesful')

        const mailOptions = {
            from: 'Servidor Node.js',
            to: "dario_156a@hotmail.com",
            subject: 'Nuevo Registro',
            html: `El usuario${newUser.username} de ${newUser.edad} anios de edad se ha registrado`,
            attachments:[{
        
               path:"https://img.freepik.com/foto-gratis/disparo-gran-angular-solo-arbol-que-crece-cielo-nublado-puesta-sol-rodeada-cesped_181624-22807.jpg?w=2000"
            }
            ]
         }
        transporter.sendMail(mailOptions)
        return done(null, userWithId);
      });
    });
  })
 )
 function createHash(password) {
    return bcrypt.hashSync(
              password,
              bcrypt.genSaltSync(10),
              null);
  }
   
passport.serializeUser((user, done) => {
    done(null, user._id)
})


passport.deserializeUser((id, done) => {
    Users.find({id},done)
})

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
//gets login
app.get('/signup', (req, res) => {
  
    res.render('signup')
})


app.get('/login', (req, res) => {
    if (req.isAuthenticated()) {
       
       let user = req.user
 
        res.render('index')
    } else {
       
        let user = req.user
      logger.info("Estoy en el else")
  
        res.render('login')
    }
})

app.post('/login', passport.authenticate('login',{
    successRedirect: 'api/productos',
    failureRedirect: '/faillogin',
    
}),(req, res) => {
  var user = req.user
})


app.post('/signup', passport.authenticate('signup',{
    successRedirect: '/iniciar',
    failureRedirect: '/failsignup',
}),(req, res) => {
    const { username, password } = req.body
     
})
app.get("/iniciar",(req,res)=>{

    res.render("iniciar")
    })

    const carrito = []
    app.get("/api/carrito2",async(req,res)=>{
        const usuario = req.session.passport.user
        const usuario2 =  await Users.findOne({_id:usuario})
        const usuariocarrito = {usuario:usuario2.username,email:usuario2.email}
         
carrito.unshift(usuariocarrito)
console.log(carrito)
      
        
        
        res.render("carrito",{
            carrito:carrito
        })
        })
        
app.get("/faillogin",(req,res)=>{
res.render("faillogin")
})
app.get("/failsignup",(req,res)=>{
    res.render("failsignup")
    })

// logout
app.get('/logout', (req, res, next) => {
    req.logout((err) => {
        if (err) { return next(err) }
        res.redirect('/login')
    })
})
const numCPUs = require('os').cpus().length
app.get('/info', (req, res) => {

    const numCPUs = require('os').cpus().length
    logger.info(numCPUs)
    logger.warn(numCPUs)
    logger.error(numCPUs)

const cwd = `Carpeta del proyecto: ${process.cwd()}`
const plataforma = `Nombre de la plataforma : ${process.platform}`
const node = ` version node:${process.version}`
const memoria = ` Memoria total reservada: ${process.memoryUsage().rss}`
const idDelProceso = `id Del proceso: ${process.pid}`
const execPath = `Path de ejecucion: ${process.execPath}`
const argumentos = `Argumentos:${process.argv[2]}`
const procesadores = `Numero de procesadores:${numCPUs}`
res.render("info",{
    cwd:cwd,
    plataforma:plataforma,
    node:node,
    memoria:memoria,
    idDelProceso:idDelProceso,
    execPath:execPath,
    argumentos:argumentos,
    procesadores:procesadores
})
})
io.on("connection", async (socket) => {
    logger.warn("Socket On")
    const prods = await contenedor.getAll()
    // const mensaje2 = await contenedorMensajes.getAllFs()

    console.log(prods)
    const mensaje = {
        mensajee: "todo ok",
        prods
        // mensaje2,
    }
    socket.emit("mensaje-servidor", mensaje)
    socket.on("mensaje-nuevo", (mensajeChat) => {
        mensaje2.push(mensajeChat)
        contenedorMensajes.saveFs(mensajeChat)
        io.sockets.emit("mensaje-servidor", mensaje)
    })

    socket.on("producto-nuevo", (productos) => {
        prods.push(productos)
        contenedor.saveMariaDb(productos)
        io.sockets.emit("mensaje-servidor", mensaje)
    })
    socket.on("mensaje-nuevo2", (usuarios) => {
        arraYusuarios.push(usuarios)
        console.log(usuarios)
    

    })
    socket.on("producto-carrito", (carritoProducto) => {
        console.log("Hola socket")
       
        console.log(carritoProducto)
    carrito.push(carritoProducto)
    })
    socket.on("carrito2-servidor", (array) => {
        console.log(array)
       
        console.log(carritoProducto)
    carrito.push(carritoProducto)
    })
    socket.on("carrito22-servidor",async (final)=>{
        const TEST_MAIL = 'dario.tasa@gmail.com'

        const transporter = createTransport({
           service: 'gmail',
           port: 587,
           auth: {
               user: TEST_MAIL,
               pass: 'ttdkjczkisftsslv'
           }
        });
        let productosComprados = carrito.map(prod => {
            return `
            se compro${prod.title} a $${prod.price}
        
        
           `
        
        })
        const mailOptions2 = {
            from: 'Nueva compra',
            to: "dario_156a@hotmail.com",
            subject: 'Nuevo Registro',
            html: `la persona ${carrito[0].usuario} con el emial ${carrito[0].email} COMPRO${productosComprados} y otras cosas`,
            attachments:[{
        
               path:"https://img.freepik.com/foto-gratis/disparo-gran-angular-solo-arbol-que-crece-cielo-nublado-puesta-sol-rodeada-cesped_181624-22807.jpg?w=2000"
            }
            ]
         }
         const mailOptions3 = {
            from: 'Compra realizada ok',
            to: `${carrito[0].email}`,
            subject: 'Nuevo Registro',
            html: `la persona ${carrito[0].usuario} con el emial ${carrito[0].email} COMPRO${productosComprados} y otras cosas`,
            attachments:[{
        
               path:"https://img.freepik.com/foto-gratis/disparo-gran-angular-solo-arbol-que-crece-cielo-nublado-puesta-sol-rodeada-cesped_181624-22807.jpg?w=2000"
            }
            ]
         }
         transporter.sendMail(mailOptions2)
        transporter.sendMail(mailOptions3)
        console.log()

console.log(carrito)


        const options = {
            body: `la persona ${carrito[0].usuario} con el emial ${carrito[0].email} COMPRO${productosComprados} y otras cosas`,
            mediaUrl: [ 'https://www.chetu.com/img/twilio/partner/twilio-logo.png' ],
            from: 'whatsapp:+14155238886',
            to: 'whatsapp:+5491151652403'
         }
             const message =  await client.messages.create(options)
             console.log(message)
    })

})


app.use("/api/carrito",routerCarrito)
app.use("/api/productos",routerProductos)




const PORT = process.env.PORT || 4000
serverHttp.listen(PORT,err =>{
    if(err) throw err
    console.log(`SERVER ON PORT ${PORT}`)
})