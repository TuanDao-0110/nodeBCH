'use strict'

const path = require('path')
const { key, storageFile, adapterFile, books } = require('./storageConfig.json')
// get writestorage , read storage
const { writeStorage, readStorage } = require('./rederWriter')
// join the filePath to locate our file 
const storageFilePath = path.join(__dirname, storageFile)
// add adapter
const { adapt } = require(path.join(__dirname, adapterFile))

// get all employee
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
// get date base on id
const getFromStorage = async (id) => {
    try {
        const data = await readStorage(storageFilePath)
        if (data) {
            let result = data.find(item => item[key] === id)
            return result
        } return null
    } catch (error) {
        return error
    }

}

// add new employee to data base
const addToStorage = async (newEmployee) => {
    try {
        const data = await readStorage(storageFilePath)
        if (data) {
            data.push(adapt(newEmployee))
            return await writeStorage(storageFilePath, data)
        } return 'can not update'
    } catch (error) {
        console.log(error)
        return ''
    }
}


const updateStorage = async (updatedEmployee) => {
    try {
        const data = await readStorage(storageFilePath)
        // get data
        if (data) {
            // find object with matching ID
            const oldObject = data.find(item => item[key] === updatedEmployee.id)
            if (oldObject) {
                // if found Object now changed it
                Object.assign(oldObject, adapt(updatedEmployee))
                return await writeStorage(storageFilePath, data)
            } return false
        }
    } catch (error) {
        console.log(error)
        return 'not thing work'
    }
}


const removeFromStorage = async (id) => {
    try {
        const data = await readStorage(storageFilePath)
        if (data) {
            const i = data.findIndex(item => item[key] === id)
            if (i < 0) {
                return false
            }
            else {
                data.splice(i, 1)
                return await writeStorage(storageFilePath, data)
            }
        }
    } catch (error) {
        console.log(error)
        return ''
    }
}


module.exports = { removeFromStorage, updateStorage, addToStorage, getAllFromStorage, getFromStorage }