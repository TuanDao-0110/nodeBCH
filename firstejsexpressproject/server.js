const express = require('express')
const app = express()
const path = require('path')
require('dotenv').config()
const { port, host } = require('./config.json')
// so use static to allow express to access public --> that now can allow home.html with link css is style/styles.css will be active


const homePath = path.join(__dirname, 'home.html')


app.get('/', (req, res, next) => {
    res.status(200).sendFile(homePath)
})
// 
app.post('/login', express.urlencoded({ extended: false }), (req, res) => {
    const { username,password} = req.body
    res.status(200).send(`<h1>body ${username}</h1>`)
})
app.listen(port, host, () => {
    console.log(`listening at port ${port}`)
})