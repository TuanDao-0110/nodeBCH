const { json } = require('express')
const express = require('express')
const app = express()
require('dotenv').config()

const port = process.env.HOST || 4000
const localhost = process.env.LOCALHOST || 'localhost'


app.use(json())

app.use('/', (req, res, next) => {
    res.status(200).json({ msg: 'hello' })
})

app.all('*', (req, res, next) => {
    res.status(404).send('not found')
})
app.listen(port, localhost, () => {
    console.log(`listening at port ${port}`)
})