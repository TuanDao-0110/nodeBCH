const express = require('express')
const app = express()
const path = require('path')
const { send } = require('process')
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
    res.status(200).render('getPerson', { title: 'get person', header1: 'new header', action: '/getPerson' })
})
app.post('/getPerson', (req, res, next) => {
    const { id } = req.body
    let numberId = Number(id)
    newData.getOne(numberId).then(result =>
        res.status(200).render('personPage',
            { title: 'get user ', header: 'get user', action: '/getPerson', result }
        )
    ).catch(result => sendErrorPage(res, result))
})

app.get('/inputform', (req, res, next) => {
    res.render('form', {
        title: 'add person',
        header1: 'add a new person',
        action: '/input',
        id: { value: '', readonly: '' },
        firstname: { value: '', readonly: '' },
        lastname: { value: '', readonly: '' },
        department: { value: '', readonly: '' },
        salary: { value: '', readonly: '' },
    })
})

app.post('/input', (req, res, next) => {
    if (!req.body) return res.statusCode(500)
    const { id, department, lastname, firstname, salary } = req.body
    const numberId = Number(id)
    const numberSalary = Number(salary)
    let employee = { id: numberId, department, lastname, firstname, salary: numberSalary }

    newData.insert(employee).then(status => sendStatusPage(res, status)).catch(error => sendErrorPage(res, error))

})
app.get('/updateform', (req, res, next) => {
    res.render('form', {
        title: 'update person',
        header1: 'update a new person',
        action: '/updatedata',
        id: { value: '', readonly: '' },
        firstname: { value: '', readonly: 'readonly' },
        lastname: { value: '', readonly: 'readonly' },
        department: { value: '', readonly: 'readonly' },
        salary: { value: '', readonly: 'readonly' },
    })
})
app.post('/updatedata', (req, res) => {

    if (!req.body) return res.sendStatus(500)
    newData.getOne(Number(req.body.id))
        .then(employee =>
            res.render('form', {
                title: 'update person',
                header1: 'update a new person',
                action: '/update',
                id: { value: employee.id, readonly: 'readonly' },
                firstname: { value: employee.firstname, readonly: '' },
                lastname: { value: employee.lastname, readonly: '' },
                department: { value: employee.department, readonly: '' },
                salary: { value: employee.salary, readonly: '' },
            })
        )
        .catch(error => sendErrorPage(res, error))
})
app.post('/update', (req, res) => {
    const { id, department, lastname, firstname, salary } = req.body
    const numberId = Number(id)
    const numberSalary = Number(salary)
    let employee = { id: numberId, department, lastname, firstname, salary: numberSalary }
    newData.update(employee).then(status => sendStatusPage(res, status)).catch(error => sendErrorPage(res, error))
})

app.get('/removePerson', (req, res, next) => {
    res.status(200).render('getPerson', { title: 'remove person', header1: 'remove header', action: '/removePerson' })
})
app.post('/removePerson', (req, res, next) => {
    if (!req.body) return res.statusCode(500)
    const { id } = req.body
    let numberId = Number(id)
    newData.remove(numberId).then(result =>
        sendStatusPage(res, result)
    ).catch(result => sendErrorPage(res, result))
})
app.listen(port, host, () => {
    console.log(`listening at port ${port}...`)
})

// helper functions 
const sendErrorPage = (res, error, title = 'error', header1 = 'error') => {
    sendStatusPage(res, error, title, header1)
}


const sendStatusPage = (res, status, title = 'status', header1 = 'status') => {
    return res.render('statusPage', { title, header1, status })
}