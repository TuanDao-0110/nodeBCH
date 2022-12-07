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
                    return res(result)
                } else {
                    return rej(MESSAGES.NOT_FOUND(id))
                }
            }
        })
    }
    insert(employee) {
        return new Promise(async (res, rej) => {
            if (!employee) {
                return rej(MESSAGES.NOT_INSERTED())
            } else {
                if (!employee.id) {
                    return rej(MESSAGES.NOT_INSERTED())
                } else if (await getFromStorage(employee.id)) {
                    return rej(MESSAGES.ALREADY_IN_USE(employee.id))
                }
                else if (await addToStorage(employee)) {
                    return res(MESSAGES.INSERT_OK(employee.id))
                }
                else {
                    console.log(employee)
                    return rej(MESSAGES.NOT_INSERTED())
                }

            }
        })
    }
    update(employee) {
        console.log('go here')
        return new Promise(async (res, rej) => {
            if (!employee) {
                return rej(MESSAGES.NOT_UPDATED())
            } else {
                if (await updateStorage(employee)) {
                    return res(MESSAGES.UPDATE_OK(employee))
                } else {
                    return rej(MESSAGES.NOT_UPDATED())
                }
            }
        })
    }
    remove(id) {
        return new Promise(async (res, rej) => {
            if (!id) {
                return rej(MESSAGES.NOT_FOUND('---empty---'))
            } else if (await removeFromStorage(id)) {
                return res(MESSAGES.REMOVE_OK(id))
            } else {
                return rej(MESSAGES.NOT_REMOVED(id))
            }
        })
    }
}
