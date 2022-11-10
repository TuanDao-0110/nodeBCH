'user strict'

const fs = require('fs').promises





const sendFile = async (res, filePath, contentType = 'text/html') => {
    try {
        const data = await fs.readFile(filePath, 'utf-8')
        res.writeHead(200, {
            'Content-Type': contentType,
            'Content-Length': Buffer.byteLength(data, 'utf-8')
        })
        res.end(data)
    } catch (error) {
        res.statusCode = 404
        res.end(`error : ${error}`)
    }
}


module.exports = { sendFile }