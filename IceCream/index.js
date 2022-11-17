'user strict'
require('dotenv').config()

const http = require('http')
const path = require('path')

const port = process.env.PORT || 4000
const host = process.env.HOST || 'localhost'

// const { read, send, sendJson, isIn, sendError } = require(path.join(__dirname, 'library', 'ultilities.js'))
const { read, send, sendJson, isIn, sendError } = require('./library/ultilities')

// const { getAllFlavor, getIceCream, hasFlavor } = require(path.join(__dirname, 'iceScreamStorage', 'iceCreameFreezer.js'))
const { getAllFlavor, getIceCream, hasFlavor } = require('./iceScreamStorage/iceCreameFreezer')

const resourceRoutes = ['/favicon', '/styles/', '/js/', '/img/']


const homePath = path.join(__dirname, 'home.html')
const server = http.createServer(async (req, res) => {
    const { pathname } = new URL(`http://${req.headers.host}${req.url}`)
    const route = decodeURIComponent(pathname)
    try {
        if (route === '/') {
            const result = await read(homePath)
            send(res, result)
        }

        else if (isIn(route, ...resourceRoutes)) {
            const result = await read(path.join(__dirname, route))
            send(res, result)
        }
        else if (route === '/all') {
            const flavors = await getAllFlavor()
            sendJson(res, flavors)
        }
        else if (isIn(route, '/icecreams/')) {
            const pathParts = route.split('/')
            if (pathParts.length > 2) {
                const iceCreamFlavor = pathParts[2]
                // console.log(iceCreamFlavor)
                if (await hasFlavor(iceCreamFlavor)) {

                    const iceCream = await getIceCream(iceCreamFlavor)
                    sendJson(res, iceCream)
                }
                else {
                    sendError(res, 'icecream not found')
                }
            }
        }
        else {
            sendError(res, 'not found')
        }

    } catch (error) {

        sendError(res, error.message, 400)

    }
})

server.listen(port, host, () => {
    console.log(`listening at ${host} ${port}....`)
})