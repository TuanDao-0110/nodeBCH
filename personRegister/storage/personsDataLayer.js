'use strict'


const persons = require('./person.json')

const search = (key, value) => {
    if (key && value) {
        const found = []
        for (const person of persons) {
            if (person[key] == value) {
                found.push(person)
            }
        }
        return found
    }
    return persons
}


module.exports = {search}