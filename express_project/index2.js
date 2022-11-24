'use strict'
const http = require('http')
const { json } = require('express')
const express = require('express')
const app = express()
require('dotenv').config()

const port = process.env.PORT || 4000
const localhost = process.env.LOCALHOST || 'localhost'



// create server by http 

const server = http.createServer(app)

app.use(json())

app.use('/', (req, res, next) => {
    // res.status(200).json({ msg: 'hello' })
    res.status(200).send(`<h1>hello</h1>`)
})

app.all('*', (req, res, next) => {
    res.status(404).send('not found')
})
server.listen(port, localhost, () => {
    console.log(`listening at port ${port}`)
})