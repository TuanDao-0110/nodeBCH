'use strict'
require('dotenv').config()
const { chownSync } = require('fs')
const http = require('http')
const port = process.env.PORT || 4000
const host = process.env.HOST || 'localhost'

http.createServer((req, res) => {
    console.log(`req.url: ${req.url} header: ${req.headers.host}`)
    const newUrl = new URL(`http://${req.headers.host}${req.url}`)
    const { search, searchParams, pathname } = newUrl
    // check our params
    console.log(pathname)
    let msg = 'stranger'
    let name = searchParams.has('name') ? searchParams.get('name') : ''
    res.writeHead(200, {
        "Content-type": "text/html ; charset = utf-8"

    })

    if (pathname === '/greetings') {
        msg = 'greeting'
    } else if (pathname === '/hi') {
        msg = 'Hi'

    } else {

    }

    res.end(`<h1>${msg}  ${name}</h1>`)

})
    .listen(port, host, () => {
        console.log('listening to port ' + port)
    })
