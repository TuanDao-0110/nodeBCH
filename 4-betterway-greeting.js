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
    let message = searchParams.has('name') ? searchParams.get('name') : 'stranger'
    res.writeHead(searchParams.has('name') ? 200 : 404, {
        "Content-type": "application/json ; charset = utf-8"

    })

    res.end(JSON.stringify({ msg: `hello : ${message}` }))

})
    .listen(port, host, () => {
        console.log('listening to port ' + port)
    })
