const carData = require('./car.json')


const getAllModel = () => {
    let allModel = []
    for (const car of carData) {

        allModel.push(car.model)
    }
    return allModel
}

const getCar = (key, value) => {
    let newArr = []
    for (const car of carData) {
        if (key !== 'year') {
            
            console.log('car key ' +key + 'value: ' + value)
            if (car[key].toLowerCase() === value.toLowerCase()) {

                newArr.push(car)
            }
        } else {

            if (car[key] === value) {

                newArr.push(car)
            }
        }
    }

    return newArr
}


const getAllCar = () => {
    const newArr = []
    for (const car of carData) {
        if (!newArr.includes(car.model)) {

            newArr.push(car.model)
        }

    }

    return carData
}



module.exports = { getAllCar, getAllModel, getCar }