'use strict'
const http = require('http')
const carData = require('./car.json')
const { getAllCar, getAllModel, getCar } = require('./carTest')
const port = 8080
const host = 'localhost'

http.createServer((req, res) => {
    res.writeHead(200, {
        'Content-Type': 'text/html ; charset=utf-8'

    })
    if (req.url === '/data') {
        res.end(JSON.stringify(carData))
    } if (req.url === '/getallcar') {
        res.end(JSON.stringify(getAllCar()))
    } else {
        // res.end(JSON.stringify(getCar('model', 'c')))
        res.end(createHTML(carData))
    }

}).listen(port, host, () => {
    console.log('listening to port ' + port)
})
// sending as html
const createHTML = (cars) => {
    let htmlString = ``
    for (const car of cars) {
        console.log(car.model)
        htmlString += ` car model <h1>${car.model}</h1>
        car year : ${car['year']}
        `
    }
    return htmlString

}