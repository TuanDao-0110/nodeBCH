const express = require('express')
const app = express()
const path = require('path')
require('dotenv').config()
const { port, host } = require('./config.json')
// so use static to allow express to access public --> that now can allow home.html with link css is style/styles.css will be active
// set up view engin 
app.set('view engine', 'ejs')
// where to set the pages
app.set('views', path.join(__dirname, 'pageTemplates'))

const homePath = path.join(__dirname, 'home.html')


app.get('/', (req, res, next) => {
    res.status(200).sendFile(homePath)
})
// 
app.post('/login', express.urlencoded({ extended: false }), (req, res) => {
    const { username, password } = req.body
    // res.status(200).send(`<h1>body ${username}</h1>`)
    res.status(200).render('result', { title: "data", header1: 'your data', data: req.body })
})
app.listen(port, host, () => {
    console.log(`listening at port ${port}`)
})