'use strict'

const fs = require('fs').promises
const path = require('path')

const MIMETYPES = require('./mimetypes.json')

const read = async (filePath) => {
    const extension = path.extname(filePath).toLowerCase()
    // octet-stream is wrong
    const mime = MIMETYPES[extension] || { "type": "application/octet-stream", "encoding": "binary" }

    try {
        const fileData = await fs.readFile(filePath, mime.encoding)
        return ({ fileData, mime })
    } catch (err) {
        return err
    }
}
// resource is return value from read()
const send = (res, resource) => {
    res.writeHead(200, {
        "Content-Type": resource.mime.type,
        "Content-Length": Buffer.byteLength(resource.fileData, resource
            .mime.encoding)
    })
    res.end(resource.fileData, resource.mime.encoding)
}

// JsonResource get from iceCreamfreezer
const sendJson = (res, jsonResource) => {
    const jsonData = JSON.stringify(jsonResource)
    res.writeHead(200, { 'Content-Type': 'application/json' })
    res.end(jsonData)
}


const sendError = (res, message, code = 404) => {
    res.writeHead(code, { "Content-Type": "application/json" })
    res.end(JSON.stringify({ message }))
}

const isIn = (route, ...routes) => {
    for (const i of routes) {
        if (route.startsWith(i)) {
            console.log(i)
            return true
        }
    }
    return false
}

module.exports = { read, send, sendJson, isIn, sendError }


