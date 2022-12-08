const express = require('express')
const app = express()
const host = 'localhost'
const port = 4000
const { adapterFile } = require('./storage/storgeConfig.json')
const path = require("path")
const Datastorage = require('./storage/dataStorageLayer')
const newData = new Datastorage
// add middleware for ejs
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'pages'))
app.use(express.urlencoded({ extended: false }))
app.use(express.static(path.join(__dirname, 'public')))
const menuPath = path.join(__dirname, 'menu.html')

app.get('/', (req, res, next) => {
    res.sendFile(menuPath)
})

app.get('/getall', (req, res, next) => {
    newData.getAll().then(data =>
        res.render('getall', {
            data, title: 'All Book'
        })
    ).catch(err =>
        failBanner(res, err.message)

    )
})
app.get('/getbook', (req, res, next) => {
    res.render('getbook', { title: 'get book', action: '/getbook', method: 'post' })
})
app.post('/getbook', (req, res, next) => {
    const { bookID } = req.body
    newData.getBook(Number(bookID)).then(result =>
        res.render('bookDetails', { result })
    ).catch(err =>
        failBanner(res, err.message)

    )
})
app.get('/insertbook', (req, res, next) => {
    res.render('insertbook', { title: 'insert book', action: '/insertbook', })
})
app.post('/insertbook', (req, res) => {
    newData.insertBook(req.body).then(data =>
        // res.json({ data })
        successBanner(res, 'new book added')

    ).catch(err =>
        failBanner(res, err.message)

    )
})
app.get('/findbook', (req, res) => {
    res.render('getbook', { title: 'findbook', action: '/editbook', method: 'get' })
})
app.get('/editbook', (req, res) => {
    const { bookID } = req.query
    newData.getBook(Number(bookID)).then(result =>
        res.render('editbook', { result, title: 'edit book', action: '/editbook', method: 'post' })
    ).catch(err =>
        failBanner(res, err.message)

    )
})
app.post('/editbook', (req, res) => {
    newData.editBook(req.body).then(result =>
        successBanner(res, result.message)

    ).catch(err =>

        failBanner(res, err.message)

    )
})
app.get('/deletebook', (req, res) => {
    res.render('getbook', { title: 'delete book', action: '/deletebook', method: 'post' })
})
app.post('/deletebook', (req, res) => {
    const { bookID } = req.body
    newData.deleteBook(bookID).then(result =>
        // res.json({ result })
        // res.render('banner', { title: 'success', msg: result.message })
        successBanner(res, result.message)
    )
        .catch(err =>
            // res.json([err])
            failBanner(res, err.message)

        )

})
app.listen(port, host, () => {
    console.log(`listening on port ${port}...`)
})

const successBanner = (res, msg) => {
    return res.render('banner', { title: 'success', msg })
}

const failBanner = (res, msg) => {
    return res.render('banner', { title: 'fail', msg })

}