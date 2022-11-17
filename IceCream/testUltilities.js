'use strict'

const { read } = require("./library/ultilities")
const filePath = './testUltilities.js'
// test our read module
let data = read(filePath)
// let data = read('./img/berry.png')



data.then(res => console.log(res)).catch(err => console.log(err))





