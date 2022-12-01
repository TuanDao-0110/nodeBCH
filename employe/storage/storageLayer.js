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
        return data
    } catch (error) {
        console.log(error)
        return []
    }
}

const getFromStorage = async (id) => {
    try {
        const data = await readStorage(storageFilePath)
        if (data) {
            let result = data.find(item => item.id === id)
            return result
        }
    } catch (error) {

    }

}


const addToStorage = async (newEmployee) => {
    try {
        const data = await readStorage(storageFilePath)
        if (data) {
            data.push(newEmployee)
        }
        return await writeStorage(storageFilePath, data)
    } catch (error) {
        console.log(error)
        return ''
    }
}



