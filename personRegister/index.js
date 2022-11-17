'use strict'
const http = require('http')
const path = require('path')
const { sendFile } = require('./library/utilities')
const { search } = require("./storage/personsDataLayer")
require('dotenv').config()

const port = process.env.PORT || 4000
const host = process.env.HOST || 'localhost'
const homePath = path.join(__dirname, 'home.html')
http.createServer(
    (req, res) => {
        const { pathname, searchParams } = new URL(`http://${req.headers.host}${req.url}`)
        console.log(pathname)
        const route = decodeURIComponent(pathname)
            console.log(route)
        if (route === '/') {
            sendFile(res, homePath)
        }

        else if (route.startsWith('/page/')) {
            sendFile(res, path.join(__dirname, route), 'text/css')
        }
        else if (route.startsWith('/js/')) {
            sendFile(res, path.join(__dirname, route), 'text/javascript')
        }
        else {
            let result = []
            if (route === "/persons") {
                result = search()
            }
            else if (route === '/persons/firstname') {
                result = search('firstName', searchParams.get('value'))
            }
            else if (route === '/persons/lastname') {
                result = search('lastName', searchParams.get('value'))
            } else if (route === '/persons/age') {
                result = search('age', searchParams.get('value'))

            } else {
                result = { message: "key not found" }
            }

            res.writeHead(200, {
                'Content-Type': 'application/json'
            }).end(JSON.stringify(result))


        }
    }

).listen(port, host, () => {
    console.log(`listening ${port}...`)
})