'use strict'

const fs = require('fs').promises
const { json } = require('express')
const path = require('path')

const MIMETYPES = require('./mimetypes.json')

const read = (filePath) => {
    const extension = path.extname(filePath).toLowerCase()
    // octet-stream is wrong
    const mime = MIMETYPES[extension] || { "type": "application/octet-stream", "encoding": "binary" }


    return fs.readFile(filePath, mime.encoding)
        .then(fileData => ({ fileData, mime }))
        .catch(err => err)
}

module.exports = { read }


