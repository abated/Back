const log4js = require("log4js")
// import log4js from "log4js"

log4js.configure({
    appenders: {
        // defino dos soportes de salida de datos
        consola: { type: 'console' },
        archivo: { type: 'file', filename: 'error.log' },
        archivo2: { type: 'file', filename: 'warning.log' },
        // defino sus niveles de logueo
        loggerConsola: { type: 'logLevelFilter', appender: 'consola', level: 'info' },
        loggerArchivo: { type: 'logLevelFilter', appender: 'archivo', level: 'error' },
        loggerArchivo2: { type: 'logLevelFilter', appender: 'archivo2', level: 'warn' }
      },
      
      categories: {
        default: {
          appenders: ['loggerConsola'], level: 'all'
        },
        custom: {
          appenders: ['loggerConsola', 'loggerArchivo','loggerArchivo2'], level: 'all'
        }
      }
})

let logger = log4js.getLogger("custom")

// if(process.env.NODE_ENV === "production"){
//     logger = log4js.getLogger("pord")
// }else{
//     logger = log4js.getLogger()

// }
// export default logger
module.exports = logger