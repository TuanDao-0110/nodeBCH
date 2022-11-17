'use strict'
const { getAllFlavor, getIceCream, hasFlavor } = require('./iceScreamStorage/iceCreameFreezer')


// getAllFlavor().then(res => console.log(res))
// getIceCream('vanila').then(res => console.log(res)).catch(err => console.log(err))
// hasFlavor('vanla').then(res => console.log(res)).catch(err => console.log(err))


// try with allPromise
Promise.all([getAllFlavor(), getIceCream('vanila')]).then(res => console.log(res))

async function test() {
    try {
        const result = await getIceCream('vanila')
        console.log(result)
    } catch (error) {
        console.log(error)
    }
}


test()