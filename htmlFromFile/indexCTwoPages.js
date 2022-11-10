'use strict'

const http = require('http')
const path = require('path')
// fs to read and write file
const fs = require('fs')
const { port, host, } = require('./config.json')
// 1. dirname is your current folder
// 2. next gonne be your next folder location.
const homePath = path.join(__dirname, 'home.html')
const homeApath = path.join(__dirname, 'pageA.html')
const server = http.createServer(async (req, res) => {
    const { pathname } = new URL(`http://${req.headers.host}${req.url}`)
    const route = decodeURIComponent(pathname)
    console.log(route)
    if (route === '/') {
        sendFile(res, homePath)
    }
    else if (route === '/pageA') {
        sendFile(res, homeApath)
    }
    else if (route.startsWith('/styles/')) {
        sendFile(res, path.join(__dirname, route,), 'text/css')
    }
    else {
        res.statusCode = 404
        res.end('error : page not found')
    }


})
server.listen(port, host, () => {
    // console.log(`listening at ${port} ....`)
})



const sendFile = async (res, filePath, contentType = 'text/html') => {
    try {
        const data = await fs.promises.readFile(filePath, 'utf-8')
        res.writeHead(200, {
            'Content-Type': contentType,
            'Content-Length': Buffer.byteLength(data, 'utf-8')
        })
        res.end(data)
    } catch (error) {
        res.statusCode = 404
        res.end(`error : ${error}`)
    }
}