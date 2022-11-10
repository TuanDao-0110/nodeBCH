'use strict'

const http = require('http')
const path = require('path')
// fs to read and write file
const fs = require('fs')
const { port, host, } = require('./config.json')
// 1. dirname is your current folder
// 2. next gonne be your next folder location.
const homePath = path.join(__dirname, 'home.html')
http.createServer(
    async (req, res) => {
        sendFile(res, homePath)
    }).listen(port, host, () => {
        console.log(`listening at ${port} ....`)
    })



const sendFile = async (res, filePath) => {
    try {
        const data = await fs.promises.readFile(filePath,'utf-8')
        res.writeHead(200, {
            'Content-Type': 'text/html',
            'Content-Length': Buffer.byteLength(data, 'utf-8')
        })
        res.end(data)
    } catch (error) {
        res.statusCode = 404
        res.end(`error : ${error}`)
    }
}