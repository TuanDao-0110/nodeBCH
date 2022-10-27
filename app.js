'use strict'
require('dotenv').config()
const { json } = require('express')
const http = require('http')
const port = process.env.PORT || 4000
const host = process.env.HOST || 'localhost'

http.createServer((req, res) => {
    // destructed from URL
    const { pathname, search, searchParams, host } = new URL(`http://${req.headers.host}${req.url}`)
    // console it
    console.log(`pathname: ${pathname} search: ${search} searchparam: ${searchParams}`)
    // set status vs send data to browser.
    res.writeHead(200, {
        "Content-Type": 'text/json; charset = utf-8'
    })
    // our purpose is to analys each elemnent in http-request: 
    res.end(JSON.stringify({ pathname, search, searchParams, 'header': req.headers, 'url': req.url, host }))
})
    .listen(port, host, () => {
        console.log('listening to port ' + port)
    })
