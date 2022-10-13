"use strict";
const data = require('./person.json')
console.log(data)



console.log(data['age'])


let fieldName = 'age';
console.log(data[fieldName])


function print(fieldName) {
    return data[fieldName]
}


console.log(print('age'))



console.log("################## key ####################")
console.log(Object.keys(data))

for (const key of Object.keys(data)) {
    console.log(print(key))
}