'use strict'

const path = require('path')
const { storageFile } = require('./storageConfig.json')
// get writestorage , read storage
const { writeStorage, readStorage } = require('./rederWriter')
// join the filePath to locate our file 
const storageFilePath = path.join(__dirname, storageFile)


const getAllFromStorage = async () => {
    try {
        const data = await readStorage(storageFilePath)
        // read all file from employee.json
        console.log(data)
        return data
    } catch (error) {
        console.log(error)
        return []
    }
}
getAllFromStorage()