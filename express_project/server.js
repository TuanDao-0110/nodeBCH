const express = require('express')
const app = express()
require('dotenv').config()

const port = process.env.HOST || 4000
const localhost = process.env.LOCALHOST || 'localhost'


app.use('/',(req,res,next)=> { 

}).listen(port,localhost,()=> { 
    console.log(`listening at port ${port}`)
})