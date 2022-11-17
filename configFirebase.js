const moongose = require("mongoose")
//mongodb+srv://dario:<1164945700>@cluster0.vqbfuks.mongodb.net/test


//mongodb+srv://dario:<1164945700>@cluster0.vqbfuks.mongodb.net/?retryWrites=true&w=majority
const connectDBFirebase = async()=>{
try {
    
    const url = "mongodb+srv://dario:1164945700@cluster0.vqbfuks.mongodb.net/?retryWrites=true&w=majority"
    await moongose.connect(url,{
       useNewUrlParser:true,
       useUnifiedTopology:true,
    })
    console.log("mongoDb conectado")
} catch (error) {
    console.log(error)
}
}
module.exports = connectDBFirebase