const https = require('https')

const options = {
    hostname: 'http://localhost:8000/axios',
    path: '/axios',
    method: 'GET'
}

const req = https.request(options, res => {
    console.log(`statusCode: ${res.statusCode}`)
    
    res.on('data', d => {
        process.stdout.write(d)
    })
})


req.on('error', error => { 
    console.log(error)
 })

 req.end()