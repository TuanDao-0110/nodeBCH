'use strict'
require('dotenv').config()
const { getAllCar, getAllModel, getCar } = require('./carTest')
const http = require('http')
const port = process.env.PORT || 4000
const host = process.env.HOST || 'localhost'

http.createServer((req, res) => {
    console.log(`req.url: ${req.url} header: ${req.headers.host}`)
    const newUrl = new URL(`http://${req.headers.host}${req.url}`)
    const { search, searchParams, pathname, } = newUrl
    // check our params
    res.writeHead(200, {
        "Content-type": "application/json ; charset = utf-8"
    })

    // 1. get all car 
    if (pathname === '/car') {
        let newArr = getAllCar()
        return res.end(JSON.stringify({ msg: 'succeed', data: newArr }))
    }

    // console.log(searchParams.get('licence'))
    // 2. get by license 
    if (pathname === '/search/bylicence') {
        let newArr = getCar('license', searchParams.get('licence'))
        return res.end(JSON.stringify(newArr))

    }
    // 3. search by year 
    if (pathname === '/search/byYear') {
        console.log(searchParams.get('year'))
        let newArr = getCar('year', Number(searchParams.get('year')))
        return res.end(JSON.stringify(newArr))

    }
    // search by key ==> licence & year 
    console.log(searchParams)
    if (pathname === '/search') {

    }
    res.end('not found')
})
    .listen(port, host, () => {
        console.log('listening to port ' + port)
    })
