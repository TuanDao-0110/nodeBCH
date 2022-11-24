const { json } = require('express')
const express = require('express')
const app = express()
const path = require('path')
require('dotenv').config()

const port = process.env.PORT || 4000
const localhost = process.env.LOCALHOST || 'localhost'
// so use static to allow express to access public --> that now can allow home.html with link css is style/styles.css will be active
app.use(express.static('./public'))
const homePath = path.join(__dirname, 'home.html')
const pageBPath = path.join(__dirname, 'pageB.html')

app.use(json())


app.get('/', (req, res, next) => {
    res.status(200).sendFile(homePath)
})
app.get('/pageb', (req, res) => {
    res.status(200).sendFile(pageBPath)
})

// app.all('*', (req, res, next) => {
//     res.status(404).send('not found')
// })
app.listen(port, localhost, () => {
    console.log(`listening at port ${port}`)
})