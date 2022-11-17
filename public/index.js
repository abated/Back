const server = io().connect()
function formatDate() {
    let date_ob = new Date(); 
    let date = ("0" + date_ob.getDate()).slice(-2); 
    let month = ("0" + (date_ob.getMonth() + 1)).slice(-2); 
    let year = date_ob.getFullYear(); 
    let hours = date_ob.getHours(); 
    let minutes = date_ob.getMinutes(); 
    let seconds = date_ob.getSeconds(); 
    return(year + "/" + month + "/" + date + " " + hours + ":" + minutes + ":" + seconds);
}
const render = (productos) => {
    let listado = document.getElementById("listado")
    // let listado = document.querySelector("#listado")
    let html = productos.map(prod => {
        return `
        <li>
        <form onsubmit="return agregarCarrito${prod.id}(this)" class="mt-5">
        <span class="nombre" name="title" id="${prod.id}">
        ${prod.title}
        </span>
        <span class="hora" name="price">
        [${prod.price}]:
        </span>
        <span class="mensaje" name="thumbnail">
        <img src=" ${prod.thumbnail}" alt="">
        </span>
        <input type="submit" value="Add Product">

        </form>
    </li>
       `

    })
    listado.innerHTML = html.join(" ")

}
// const render3 = (productos) => {
//     let listado = document.getElementById("carrito")
//     // let listado = document.querySelector("#listado")
//     let html = productos.map(prod => {
//         return `
//     nombro:${prod.title}
    
//        `

//     })
//     listado.innerHTML = html.join(" ")

// }
const agregarCarrito1 = (evento4) => {
    const productos = { title: "NVIDIA 3091", price: 300 }
    server.emit("producto-carrito",productos)
    return false
}
const agregarCarrito2 = (evento4) => {
    const productos = { title: "NVIDIA 3060", price: 200 }
    server.emit("producto-carrito",productos)
    return false
}
const agregarCarrito3 = (evento4) => {
    const productos = { title: "AMD 5700", price: 400 }
    server.emit("producto-carrito",productos)
    return false
}
const agregarCarrito4 = (evento4) => {
    const productos = { title: "AMD 6800XT", price: 500 }
    server.emit("producto-carrito",productos)
    return false
}
const render2 = (productos) => {
    let listado = document.getElementById("mensaje")
    // let listado = document.querySelector("#listado")
    let html2 = productos.map(prod => {
        return `
        <li>

        <span class="nombre">
        ${prod.nombre}
        </span>
        <span class="hora">
        [${prod.hora}]:
        </span>
        <span class="mensaje">
        ${prod.mensaje},${prod.nombre1}
        </span>
    </li>
       `
    })
    listado.innerHTML = html2.join(" ")
}
const addUser =(evento3) =>{
    const nombre1 = document.querySelector("#usuario").value
    
    server.emit("mensaje-nuevo2", nombre1)
    return false
}

const addMensaje = (evento2) => {
    const nombre1 = document.querySelector("#nombre").value
    const nombre = document.querySelector("#nombre2").value
    const edad = document.querySelector("#edad").value
    const alias = document.querySelector("#alias").value
    const avatar = document.querySelector("#avatar").value
    const mensaje = document.querySelector("#mensaje").value
    
    
    const hora2 = new Date().getTime()
    const hora = formatDate()
    const productos2 = { nombre,nombre1,edad,alias,avatar, mensaje,hora }

    server.emit("mensaje-nuevo", productos2)
    
    return false


}

const addProduct = (evento) => {
    const nombre = document.querySelector("#nombre").value
    const precio = document.querySelector("#precio").value
    const thumbnail = document.querySelector("#thumbnail").value
    const productos = { title: nombre, price: precio,thumbnail }
    server.emit("producto-nuevo", productos)
    return false
}
function myFunction() {
    document.getElementById("demo").style.color = "red";
  }
function mandarCarrito(params) {
    console.log("Hola")
    server.emit("carrito22-servidor", mensaje => {
        // console.log("Hola")
        // console.log(mensaje)
        
        
    })
}




server.on("mensaje-servidor", mensaje => {
    console.log("Hola")
    
    render(mensaje.prods)
    render2(mensaje.mensaje2)
    
})

