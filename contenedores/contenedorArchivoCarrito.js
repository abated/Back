const fs = require("fs")
class contenedorArchivoCarrito {
    constructor(ruta) {
        this.ruta = ruta
    }
    async save(obj) {
        try {
            let dataAchr = await fs.promises.readFile(this.ruta, "utf-8");
            let dataAchrParse = JSON.parse(dataAchr)
            if (dataAchrParse.length) {
                await fs.promises.writeFile(this.ruta, JSON.stringify([...dataAchrParse, { ...obj, id: dataAchrParse[dataAchrParse.length - 1].id + 1 }], null, 2))
            } else {
                await fs.promises.writeFile(this.ruta, JSON.stringify([{ ...obj, id: 1 }], null, 2))
            }
            console.log(`el arhivo tiene el id ${dataAchrParse[dataAchrParse.length - 1].id + 1}`)
        } catch (error) {
            throw error
        }
    }
    async getById(id) {
        try {
            let dataAchr = await fs.promises.readFile(this.ruta, "utf-8");
            let dataAchrParse = JSON.parse(dataAchr)
            let producto = dataAchrParse.find(producto => producto.id === id)
            if (producto) {
                return producto
            } else {
                throw `No existe el id:${id}`
            }
        } catch (error){
            throw error
        }
    }
    async getAll() {
        try {
            let dataAchr =  await fs.promises.readFile(this.ruta, "utf-8");
            let dataAchrParse = JSON.parse(dataAchr)
            if (dataAchrParse.length) {
                   return  dataAchrParse
            } else {
               return {error:"No se encontraron los productos"}
            }
        } catch (error) {
            console.log(error)
        }
    }
    async deleteById(id) {
        try {
            let dataAchr = await fs.promises.readFile(this.ruta, "utf-8")
            let dataAchrParse = JSON.parse(dataAchr)
            let producto = dataAchrParse.find(producto => producto.id == id) //busca el producto si esta
            if (producto) {
                const dataAchrParseFiltrado = dataAchrParse.filter(producto => producto.id !== id)
                await fs.promises.writeFile(this.ruta, JSON.stringify(dataAchrParseFiltrado, null, 2), "utf-8")
                return {msg:"producto eliminado"}
            } else {
                throw "No se encontro el producto a eliminar"
            }
        } catch (error) {
          throw error
        }
    }
    async updateById(obj){
        try {
            let dataAchr = await fs.promises.readFile(this.ruta, "utf-8")
            let dataAchrParse = JSON.parse(dataAchr)
            const objIndex = dataAchrParse.findIndex(prod => prod.id === obj.id)
          
            if(objIndex !== -1){
                dataAchrParse[objIndex] = obj
                await fs.promises.writeFile(this.ruta,JSON.stringify(dataAchrParse,null,2))
                return {msg:"producto actualizado"}
            }else{
                throw "No existe el producto"
            }
        } catch (error) {
            throw error
        }
    }
    async deleteAll() {
        try {
            let dataAchr = await fs.promises.readFile(this.ruta, "utf-8")
            let dataAchrParse = JSON.parse(dataAchr)
            if (dataAchrParse.length) {
                await fs.promises.writeFile(this.ruta, JSON.stringify([], null, 2), "utf-8")
                console.log("productos eliminados")
            } else {
                console.log("No hay productos para eliminar")
            }
        } catch (error) {
            console.log(error)
        }
    }
}
module.exports = {contenedorArchivoCarrito}