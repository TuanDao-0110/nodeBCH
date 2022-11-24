const express = require('express')
const app = express()
const path = require('path')
require('dotenv').config()
const { port, host } = require('./config.json')
// so use static to allow express to access public --> that now can allow home.html with link css is style/styles.css will be active




app.get('/', (req, res, next) => {
    res.status(200).send('homePath')
})


app.listen(port, host, () => {
    console.log(`listening at port ${port}`)
})