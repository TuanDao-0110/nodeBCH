const express = require('express')
const app = express()
const host = 'localhost'
const port = 4000

const path = require("path")


// add middleware for ejs
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'pages'))
app.use(express.urlencoded({ extended: false }))
app.use(express.static(path.join(__dirname, 'public')))
const menuPath = path.join(__dirname, 'menu.html')

app.get('/', (req, res, next) => {
    res.sendFile(menuPath)
})

app.get('/getall',(req,res,next)=> { 
    
})
app.listen(port, host, () => {
    console.log(`listening on port ${port}...`)
})