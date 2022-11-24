// 'use strict'



let iceCreamList;
let resultarea;
document.addEventListener('DOMContentLoaded', init)
// render all data 
async function init() {
    iceCreamList = document.getElementById('iceCreamList');
    resultarea = document.getElementById('resultarea')
    try {
        const data = await fetch('/all')
        const flavors = await data.json()
        populateIcecreamlist(flavors)
    } catch (error) {
        console.log(error)
    }
}
// render all data function
function populateIcecreamlist(gueryResult) {
    for (const flavor of gueryResult) {
        const option = document.createElement('option')
        option.value = flavor
        option.textContent = flavor
        iceCreamList.appendChild(option)
    }
    iceCreamList.addEventListener('change', choose)
    iceCreamList.value = ''
}
// get each icecream
async function choose() {
    const iceCreamFlavor = iceCreamList.value;
    if (iceCreamFlavor.length > 0) {
        try {
            const data = await fetch(`/icecreams/${iceCreamFlavor}`)
            const result = await data.json()
            updateResult(result)

        } catch (error) {
            showErrorMsg(error.message)
        }
    } else {
        //  clearresult
    }
}
// render each icecream
function updateResult(data) {
    if (!data) {
        //error
        showErrorMsg('Programming error ! ')
    }
    else if (data.message) {
        //error
        showErrorMsg(data.message)
    } else if (data.name && !data.name.length) {
        //clear result
        clearResultArea()
    } else {
        let htmlString = `
                    <div>
                        <p id="name">
                        ${data.name}
                        </p>
                        <p id="price">
                        ${data.price}
                        </p>
                    </div>
                    `
        if (data.image && data.image.length) {
            htmlString += `<img src="/img/${data.image}"/>`
        }
        resultarea.innerHTML = htmlString
    }
}
// clear result
function clearResultArea() {
    resultarea.innerHTML = ''
}
// error message

function showErrorMsg(message) {
    resultarea.innerHTML = `
            <div class="error" >
            <h2>
            error</h2>
            <p>
            ${message}
            </p>
            </div>
            
            `
}
