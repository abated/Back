const dotenv = require("dotenv")
const path = require("path")

dotenv.config({ 
    path: path.resolve(process.cwd(), process.env.NODE_ENV + '.env') 
})

// export default {
//     NODE_ENV: process.env.NODE_ENV || 'MONGO',
//     HOST: process.env.HOST || 'localhost',
//     PORT: process.env.PORT || 8080,
//     // MEM - FILES - MONGO
//     TIPO_PERSISTENCIA:'MONGO'
// }
module.exports = {
    NODE_ENV: process.env.NODE_ENV || 'MONGO',
    HOST: process.env.HOST || 'localhost',
    PORT: process.env.PORT || 8080,
    // MEM - FILES - MONGO
    TIPO_PERSISTENCIA:'MONGO'
}