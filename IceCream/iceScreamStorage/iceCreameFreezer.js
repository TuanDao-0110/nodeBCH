'use strict'

const path = require('path')

const { read } = require('../library/ultilities') //not nice (hardcoded path)

const jsonPath = path.join(__dirname, 'icescream.json')

const getAllFlavor = async () => {
    try {
        // get data from file read
        const data = await read(jsonPath)
        // tranfer from json to normal --> to Object
        const iceCreams = await JSON.parse(data.fileData)
        // 
        return Object.keys(iceCreams)
    } catch (error) {
        console.log(error)
        return []
    }
}


const hasFlavor = async (flavor) => {
    try {
        const data = await read(jsonPath)
        const iceCreams = await JSON.parse(data.fileData)
        return Object.keys(iceCreams).includes(flavor)
    } catch (error) {
        return false
    }
}

const getIceCream = async (flavor) => {
    try {
        const data = await read(jsonPath)
        const iceCreams = await JSON.parse(data.fileData)
        return iceCreams[flavor] || null
    } catch (error) {
        return null
    }
}

module.exports = { getAllFlavor, getIceCream, hasFlavor }





