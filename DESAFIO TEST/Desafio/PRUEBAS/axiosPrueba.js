
const axios = require('axios')
const url = "http://localhost:8000/axios/"
const url2 = "http://localhost:8000/api/productos/63840c026af5520022178ad1"

// const agregarProductoAxios = async () =>{
//     const respuesta=  axios.post(url2)
//     let doc = await respuesta.insertMany({thumbnail:thumbnail,title:title,price:price});
//     console.log(doc)
//   }

const getProducts2 = async()=>{
const productos = await axios.get(url) 
  .then(res =>{
console.log(res.data)
  })
  return productos
 }
 const postProductos = async()=>{
   console.log("post OK")

   axios( {
    method: 'post',
    url: 'http://localhost:8000/api/productos/',
    data: {
        title: 'PLACA DE VIDEO',
        price: 20,
        thumbnail:"FOTO"
        
    }
  });
 }
 const getProducts2id = async()=>{
  const productos = await axios.get(url2) 
    .then(res =>{
  console.log(res.data)
    })

   }
//  getProducts2();
//  postProductos();
 getProducts2id();
 


