//CLUSTER
const cluster = require("cluster")

const http= require("http")

console.log(process.argv[3])
const CLUSTER = (modoCluster) =>{
    if(modoCluster === "CLUSTER"){
        if (cluster.isPrymary) {
            console.log(`Master ${process.pid} is running`)
            for (let i = 0; i < numCPUs; i++) {
                cluster.fork()
            }
            cluster.on('exit', (worker, code, signal) => {
                console.log(`worker ${worker.process.pid} died`)
                cluster.fork()
            })
        }  else {
            console.log("modo cluster")
            http.createServer((req, res) => {
                res.writeHead(200)
                res.end('hello world')
            }).listen(8000)
            
            console.log(`Worker ${process.pid} started`)
        }
    }
}
// function CLUSTER(modoCluster) {
    
//     if(modoCluster === "CLUSTER"){
//         if (cluster.isPrymary) {
//             console.log(`Master ${process.pid} is running`)
//             for (let i = 0; i < numCPUs; i++) {
//                 cluster.fork()
//             }
//             cluster.on('exit', (worker, code, signal) => {
//                 console.log(`worker ${worker.process.pid} died`)
//                 cluster.fork()
//             })
//         }  else {
//             console.log("modo cluster")
//             http.createServer((req, res) => {
//                 res.writeHead(200)
//                 res.end('hello world')
//             }).listen(8000)
            
//             console.log(`Worker ${process.pid} started`)
//         }
//     }
// }
module.exports = CLUSTER