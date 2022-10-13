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

console.log("################## value ####################")

console.log(Object.values(data))
console.log(Object.entries(data))
for (const [key, value] of Object.entries(data)) {
    console.log(key + ' ' + value)
}


const person2 = {
    firstName: 'Vera',
    "lastName": "River",
    notes: `Vera is ${data.age}`
}


console.log("##################  new person 2 ####################")
console.log(Object.values(data))