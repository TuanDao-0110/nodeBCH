const http = require('http')
const host = 'localhost'
const port = '8080'



http.createServer((req, res) => {
    res.writeHead(200,{
        'content-type': 'text/html'
        
    })
        res.write('<h3>hello</h3>')
        res.end('hello')
    

}).listen(port,host, () => {
    console.log('listening from ' + host + ' ' + port + '....')
})


