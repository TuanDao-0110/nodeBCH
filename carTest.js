const carData = require('./car.json')


const getAllModel = () => {
    let allModel = []
    for (const car of carData) {

        allModel.push(car.model)
    }
    return allModel
}

const getCar = (key, value) => {
    let newArr =[]
    for (const car of carData) {
        // console.log(car[key])
        if (car[key].toLowerCase() === value.toLowerCase()) {
        
            newArr.push(car)
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

    return newArr
}



module.exports = {getAllCar,getAllModel,getCar}