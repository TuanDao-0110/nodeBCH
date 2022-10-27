'use strict'
require('dotenv').config()
const http = require('http')
const port = process.env.PORT || 4000
const host = process.env.HOST || 'localhost'

const server = http.createServer((req, res) => {
    // 1. console request header vs url
    console.log( req.headers)
    console.log('request url :' + req.url)
    // 2. show the status code 
    res.writeHead(200)
    // res.status(200).write('tuan')
    // 3. send data 
    res.end('hello')

})
server.listen(port, host, () => {
    console.log('listening to port ' + port)
})
