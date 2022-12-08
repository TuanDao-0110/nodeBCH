'use strict';
const fs = require('fs').promises


const readStorage = async (storageFile) => {
    try {
        const data = await fs.readFile(storageFile, 'utf-8')
        return JSON.parse(data)
    } catch (error) {
        console.log(error.message)
        return []
    }
}


const writeStorage = async (storageFile, data) => {
    try {
        await fs.writeFile(storageFile, JSON.stringify(data, null, 4), {
            encoding: 'utf8',
            // replace old version by w
            flag: 'w'
        })
    } catch (error) {
        console.log(error)// for debug
        return false
    }
}




module.exports = { writeStorage, readStorage }