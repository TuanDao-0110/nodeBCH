'use strict'

const http = require('http')
const path = require('path')
// fs to read and write file
const fs = require('fs')
const { port, host, } = require('./config.json')
// 1. dirname is your current folder 
// 2. next gonne be your next folder location.
const homePath = path.join(__dirname, 'home.html')
console.log(homePath)
http.createServer((req, res) => {
    fs.readFile(homePath, 'utf-8', (err, data) => {
        if (err) {
            res.statusCode = 404
          return   res.end(err.message)
        }
        else{

             res.writeHead(200, {
                'Content-Type': 'text/html',
                'Content-Length': Buffer.byteLength(data, 'utf-8')
            })
       return     res.end(data)
        }
    })


}).listen(port, host, () => {
    console.log(`listening on ${host} ${port}.....`)
})