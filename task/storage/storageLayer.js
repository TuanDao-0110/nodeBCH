const tuanDaoBook = require('./storageBook.json')
const { readStorage, writeStorage } = require('./rederWrite')
const { storageFile, key, adapterFile } = require('./storgeConfig.json')
const path = require('path')
const adapt = require("./adapt")
const storagePath = path.join(__dirname, storageFile)
const getAll = async () => {
    try {
        const data = await readStorage(storagePath)
        return data
    } catch (error) {
        return error
    }
}
const getBook = async (bookID) => {
    try {
        const data = await readStorage(storagePath)
        console.log(data.find(book => book[key] === bookID))
        if (data.find(book => book[key] === bookID) !== undefined) {
            return data.find(book => book[key] === bookID)
        }
        return false
    } catch (error) {
        console.log(error)
    }
}
const insertBook = async (newBook) => {
    let insertBook = adapt(newBook)
    try {
        const data = await readStorage(storagePath)
        if (data.find(book => book[key] === insertBook[key]) === undefined) {
            data.push(insertBook)
            await writeStorage(storagePath, data)
            return true
        }
        else {
            return false

        }
    } catch (error) {

    }
    return false
}

const updateBook = async (bookUpdate) => {
    const newBook = adapt(bookUpdate)
    try {
        const data = await readStorage(storagePath)
        const oldBook = data.find(book => book[key] === newBook[key])
        console.log(oldBook)
        if (oldBook === undefined) {
            return false
        } else {
            Object.assign(oldBook, newBook)
            await writeStorage(storagePath, data)
            return true
        }
    } catch (error) {
        return false
    }
}

const deleteBook = async (bookID) => {

    try {
        const data = await readStorage(storagePath)
        const index = data.findIndex(book => book[key] === Number(bookID))
        if (index === -1) {
            return false
        } else {
            data.splice(index, 1)
            await writeStorage(storagePath, data)
            return true
        }
    } catch (error) {
        return false
    }
}


// const book = {
//     "bookID": 100,
//     "name": "Rebellion of Sophie Q.Lister",
//     "author": "Isla Shore",
//     "type": "print - on - demand",
//     "pages": 200
// }
// deleteBook('22').then(data => console.log(data)).catch(data => console.log(data))

module.exports = { getAll, getBook, insertBook, updateBook, deleteBook }