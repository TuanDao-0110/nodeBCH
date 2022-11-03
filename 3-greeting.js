'use strict'
require('dotenv').config()
const http = require('http')
const port = process.env.PORT || 4000
const host = process.env.HOST || 'localhost'

http.createServer((req, res) => {
    console.log(`req.url: ${req.url} header: ${req.headers.host}`)
    const newUrl = new URL(`http://${req.headers.host}${req.url}`)
    const { search, searchParams } = newUrl
    // check our params
    if (searchParams.has('name')) {
        res.writeHead(200, {
            "Content-Type": 'text/json; charset = utf-8'
        })
        const name = searchParams.get('name')

        res.end(JSON.stringify({ name }))
    }
    else {
        res.writeHead(404, {
            "Content-Type": 'text/json; charset = utf-8'
        })
        res.end('can not find user')
    }

})
    .listen(port, host, () => {
        console.log('listening to port ' + port)
    })
