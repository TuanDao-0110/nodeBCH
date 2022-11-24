const express = require('express')
const app = express()
const path = require('path')
require('dotenv').config()
const { port, host } = require('./config.json')
// so use static to allow express to access public --> that now can allow home.html with link css is style/styles.css will be active
// set up view engine
app.set('view engine', 'ejs')
// where to set the pages
app.set('views', path.join(__dirname, 'pageTemplates'))
// user 
const users = {
    matt: 'secret',
    vera: '12345',
    jesse: '333',
    tuan: 'tuan'
}

const cars = [
    {
        "model": "A",
        "license": "123",
        "year": 1991
    },
    {
        "model": "b",
        "license": "123",
        "year": 1943
    },
    {
        "model": "C",
        "license": "989",
        "year": 1232
    },
    {
        "model": "D",
        "license": "4353",
        "year": 3002
    },
    {
        "model": "C",
        "license": "888",
        "year": 2000
    },
    {
        "model": "E",
        "license": "888",
        "year": 2000
    },
    {
        "model": "D",
        "license": "888",
        "year": 2000
    }
]
const homePath = path.join(__dirname, 'home.html')
app.use(express.static(path.join(__dirname, 'public')))



app.get('/', (req, res, next) => {
    res.status(200).sendFile(homePath)
})
// 
app.post('/login', express.urlencoded({ extended: false }), (req, res) => {
    const { username, password } = req.body
    // check data first that make sure the exist in our database
    if (Object.keys(users).includes(username) && users[username] === password) {
        return res.status(200).render('result', { title: "data", header1: 'your data', data: { username, password } })
    }
    return res.status(401).render('error', { username })


})

app.get('/users', (req, res) => {
    res.status(200).render('users', { title: 'username', header1: 'names', usernames: Object.keys(users) })
})
app.get('/cars', (req, res) => {
    res.status(200).render('cars', { title: 'car table', cars })
})
app.get('/carsif', (req, res) => {
    res.status(200).render('tableif', { title: 'car table if', cars:[] })
    
})
app.listen(port, host, () => {
    console.log(`listening at port ${port}`)
})