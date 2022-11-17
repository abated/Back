const mongoose = require("mongoose")

const UsersSchema = new mongoose.Schema({
    username: {
        type: String, 
        required: true,
        trim: true,
        max: 50
    },
    avatar: {
        type: String, 
        required: true,
        trim: true,
        max: 50
    },
    nombre: {
        type: String, 
        required: true,
        trim: true,
        max: 50
    },
    direccion: {
        type: String, 
        required: true,
        trim: true,
        max: 50
    },
    edad: {
        type: Number, 
        required: true,
        trim: true,
        max: 50
    },
    telefono: {
        type: Number, 
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        max: 50,
        unique: true
    },
    password: {
        type: String,
        required: true,
        trim: true,
        max: 50
    },
})

module.exports = mongoose.model("Users",UsersSchema)