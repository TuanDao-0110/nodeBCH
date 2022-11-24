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
const homePath = path.join(__dirname, 'home.html')


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
app.listen(port, host, () => {
    console.log(`listening at port ${port}`)
})