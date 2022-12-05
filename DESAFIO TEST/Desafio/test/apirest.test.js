const request = require("supertest")("http://localhost:8000")
const expect = require("chai").expect

describe("GET", ()=>{
    it("deberia retornar un status 200", async() =>{
        let response = await request.get("/api/productos")
        expect(response.status).to.eql(200)
    })
})