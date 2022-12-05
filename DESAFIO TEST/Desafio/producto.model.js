const mongoose = require("mongoose")
const UsersSchema = new mongoose.Schema({
    title: {
        type: String, 
        required: true,
        trim: true
    },
    price: {
        type: Number, 
        required: true,
        trim: true
    },
    thumbnail: {
        type: String, 
        required: true,
        trim: true
    }

})

// export default mongoose.model("productos",UsersSchema)
module.exports = mongoose.model("productos",UsersSchema)