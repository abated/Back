const moongose = require("mongoose")
const connectDB = async()=>{
try {
    const url = "mongodb://localhost:27017/ecommerce"

    await moongose.connect(url,{
       useNewUrlParser:true,
       useUnifiedTopology:true,
    })
    console.log("mongoDb conectado")
} catch (error) {
    console.log(error)
}
}
module.exports = connectDB