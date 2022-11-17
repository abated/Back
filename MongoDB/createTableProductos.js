const {options} = require("./mariaDb/conexionDb")


const knex = require("knex")(options)

const createTable = async (nombreTabla) =>{
    try {
        await knex.schema.createTable(nombreTabla,table =>{
            table.increments("id")
            table.string("title"),
            table.integer("price"),
            table.string("thumbnail")
        })
        console.log("Tabla creada")
    } catch (error) {
        console.log(error)
    }
}

createTable("productos")