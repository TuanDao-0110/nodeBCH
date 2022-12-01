const express = require('express')
const app = express()
const path = require('path')
require('dotenv').config
const host = process.env.HOST || 'localhost'
const port = process.env.PORT || '4000'
const { storage } = require('./serverConfig.json')
const Datastorage = require(path.join(__dirname, storage.storageFolder, storage.dataLayer))
const newData = new Datastorage


// newData.insert({
//     "id": 1,
//     "firstname": "new name",
//     "lastname": "last name",
//     "department": "it",
//     "salary": 4000
// }).then().catch(err => console.log(err))



// add middleware for ejs
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'pages'))
// add middeware for ...
app.use(express.urlencoded({ extended: false }))
app.use(express.static(path.join(__dirname, 'public')))
// add menu path 
const menuPath = path.join(__dirname, 'menu.html')
// add server 
app.get('/', (req, res, next) => {
    res.status(200).sendFile(menuPath)
})
app.get('/getall', (req, res, next) => {

    newData.getAll().then(data =>
        res.status(200).render('alldata', { result: data })
    )
})
app.get('/getPerson', (req, res, next) => {
    res.status(200).render('getPerson', { title: 'get person', header1: 'new header', action: 'userid' })
})


app.listen(port, host, () => {
    console.log(`listening at port ${port}...`)
})
