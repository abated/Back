
const mongoose = require("mongoose")
// require('dotenv').config()
// import dotenv from 'dotenv'
// dotenv.config() 



// mongodb+srv://federicoosandon:Federico1@cluster0.r3sreep.mongodb.net/ -> compass
// mongodb+srv://federicoosandon:Federico1@cluster0.r3sreep.mongodb.net/?retryWrites=true&w=majority -> códig




const connectDB = async () => {
    try {
        // const url = 'mongodb://localhost:27017/ecommerce'
        const url = "mongodb+srv://dario:1164945700@cluster0.vqbfuks.mongodb.net/?retryWrites=true&w=majority"
        process.env.MONGODB_CONNECT
        // const url = process.env.MONGODB_CONNECT
        await mongoose.connect(url,{
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        console.log('MongoDB connected')
    } catch (error) {
        console.error(error)
    }
}
module.exports = connectDB
