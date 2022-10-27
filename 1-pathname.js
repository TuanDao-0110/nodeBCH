'use strict'
require('dotenv').config()
const { json } = require('express')
const http = require('http')
const port = process.env.PORT || 4000
const host = process.env.HOST || 'localhost'

http.createServer((req, res) => {
    // 1. console request header vs url
    // console.log(req.headers)
    // console.log('request url :' + req.url)
    // get data 
    // console.log(Object.keys(req))
    // 2. show the status code 
    // url data with path name
    const urlData = new URL(`http://${host}:${port}${req.url}`)
    const { pathname } = urlData
    // 3. send data 
    res.writeHead(200, { 'Content-Type': 'application/json' })
    res.end(JSON.stringify({ pathname }))

})
    .listen(port, host, () => {
        console.log('listening to port ' + port)
    })
