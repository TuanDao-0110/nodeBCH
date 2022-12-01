'use strict'

const { removeFromStorage, updateStorage, addToStorage, getAllFromStorage, getFromStorage } = require('./storageLayer')
const { CODES, MESSAGES } = require('./statusCode')
const e = require('express')




// data storage class
module.exports = class Datastorage {
    get CODES() {
        return CODES
    }
    getAll() {
        return getAllFromStorage()
    }// end getAll
    getOne(id) {
        return new Promise(async (res, rej) => {
            // check it exist
            if (!id) {
                rej(MESSAGES.NOT_FOUND('----empty----'))
            } else {
                const result = await getFromStorage(id)
                if (result) {
                    res(result)
                } else {
                    rej(MESSAGES.NOT_FOUND(id))
                }
            }
        })
    }
    insert(employee) {
        return new Promise(async (res, rej) => {
            if (!employee) {
                rej(MESSAGES.NOT_INSERTED())
            } else {
                if (!employee.id) {
                    rej(MESSAGES.NOT_INSERTED())
                } else if (await getFromStorage(employee.id)) {
                    rej(MESSAGES.ALREADY_IN_USE(employee.id))
                }
                else if (await addToStorage(employee)) {
                    res(MESSAGES.INSERT_OK(employee.id))
                }
                else {
                    rej(MESSAGES.NOT_INSERTED())
                }

            }
        })
    }
    update(employee) {
        return new Promise(async (res, rej) => {
            if (!employee) {
                rej(MESSAGES.NOT_UPDATED())
            } else {
                if (await updateStorage(employee)) {
                    res(MESSAGES.UPDATE_OK(employee))
                } else {
                    rej(MESSAGES.NOT_UPDATED())
                }
            }
        })
    }
    remove(id) {
        return new Promise(async (res, rej) => {
            if (!id) {
                rej(MESSAGES.NOT_FOUND('---empty---'))
            } else if (await removeFromStorage(id)) {
                res(MESSAGES.REMOVE_OK(id))
            } else {
                rej(MESSAGES.NOT_REMOVED(id))
            }
        })
    }
}
