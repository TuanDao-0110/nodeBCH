'use strict'
require('dotenv').config()
const { getAllCar, getAllModel, getCar } = require('../carTest')
const http = require('http')
const port = process.env.PORT || 4000
const host = process.env.HOST || 'localhost'

http.createServer((req, res) => {
    console.log(`req.url: ${req.url} header: ${req.headers.host}`)
    const newUrl = new URL(`http://${req.headers.host}${req.url}`)
    const { search, searchParams, pathname, } = newUrl
    console.log(`pathname: ${pathname} searchParams : ${searchParams}`)
    // check our params
    res.writeHead(200, {
        "Content-type": "application/json ; charset = utf-8"
    })

    if (pathname === '/') {
        return res.end('welcome cars systerm')
    }
    // 1. get all car 
    if (pathname === '/car') {
        let newArr = getAllCar()
        return res.end(JSON.stringify({ msg: 'succeed', data: newArr }))
    }

    // console.log(searchParams.get('licence'))
    // 2. get by license 
    if (pathname === '/search/bylicence') {
        let newArr = getCar('license', searchParams.get('value'))
        return res.end(JSON.stringify(newArr))

    }
    // 3. search by year 
    if (pathname === '/search/byYear') {
        let newArr = getCar('year', Number(searchParams.get('value')))
        return res.end(JSON.stringify(newArr))

    }
    // search by key vs value when from params 
    if (pathname === '/search') {
        if (searchParams.has('key') && searchParams.has('value')) {
            const key = searchParams.get('key')
            const value = searchParams.get('value')
            let newArr = getCar(key, key === 'year' ? Number(value) : value)
            return res.end(JSON.stringify({ msg: newArr }))
        }
        return res.end('not found')
    }
    res.end('not found')
})

    .listen(port, host, () => {
        console.log('listening to port ' + port)
    })
