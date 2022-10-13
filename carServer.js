const http = require('http')
const carData = require('./car.json')
const {getAllCar,getAllModel,getCar} = require('./carTest')
port = 8080
host = 'localhost'

http.createServer((req, res) => {

    if (req.url === '/data') {
        res.end(JSON.stringify(carData))
    }if ( req.url === '/getallcar') { 
        res.end(JSON.stringify(getAllCar()))
    }else{ 
        res.end(JSON.stringify(getCar('model','c')))
    }

}).listen(port, host, () => {
    console.log('listening to port ' + port)
})