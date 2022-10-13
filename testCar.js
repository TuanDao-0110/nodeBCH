"use strict"

const carData = require('./car.json')


console.log('################# #################')
console.log(carData[0])
console.log(carData[0].model)

console.log('################# last car #################')
console.log(carData[carData.length - 1])

console.log('################# loop car #################')
for (const car of carData) {
    if (car.model.toLocaleLowerCase() === "a") {
        console.log(car.license)
    }
}


// print all available models
const newArr = []
for (const car of carData) {
    if (!newArr.includes(car.model)) {
        newArr.push(car.model)
    }

}
console.log(newArr.join(' , '))


