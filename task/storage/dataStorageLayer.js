const { getAll, getBook, insertBook, updateBook, deleteBook } = require("./storageLayer")
const { CODES, MESSAGES } = require("./statusCode")
const { response } = require("express")
module.exports = class Datastorage {
    get CODES() {
        CODES
    }
    getAll() {
        return getAll()
    }
    getBook(bookID) {
        return new Promise(async (response, reject) => {
            const result = await getBook(bookID)
            if (result) {
                return response(result)
            }
            return reject(MESSAGES.NOT_FOUND(bookID))

        })
    }
    insertBook(newBook) { 
        return new Promise(async(response,reject)=> { 
            const result = await insertBook(newBook)
            if(result ) { 
                return response(result)
            }
            return reject(MESSAGES.NOT_INSERTED())
        })
    }
}


