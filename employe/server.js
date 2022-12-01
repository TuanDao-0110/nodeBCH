const express = require('express')
const app = express()
const path = require('path')
require('dotenv').config
const host = process.env.HOST || 'localhost'
const port = process.env.PORT || '4000'

app.get('/', (req, res, next) => {
    res.status(200).json({ mgs: 'success' })
}).listen(port, host, () => {
    console.log(`listening at port ${port}...`)
})
