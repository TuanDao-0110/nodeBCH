'use strict'

const { read } = require("./library/ultilities")
const filePath = './testUltilities.js'
const { getAllFlavor, getIceCream, hasFlavor } = require('./iceScreamStorage/iceCreameFreezer')
// test our read module
let data = read(filePath)
// let data = read('./img/berry.png')
console.log(

    getAllFlavor()
)

// data.then(res => console.log(res)).catch(err => console.log(err))





