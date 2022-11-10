'use strict';


(function () {
    let resultset;
    let resultsection
    let keyInput;
    let searchValueInput;
    let messageare;
    document.addEventListener('DOMContentLoaded', init);
    function init() {
        resultset = document.getElementById('resultset')
        resultsection = document.getElementById('resultsection')
        keyInput = document.getElementById('key')
        searchValueInput = document.getElementById('searchvalue')
        document.getElementById('submit').addEventListener('click', submit)
    }
    // have data from input 
    async function submit() {
        const key = keyInput.value;
        const searchValue = searchValueInput.value
        try {
            const uri = key ? `/persons/${key}?value=${searchValue}` : '/persons'
            const result = await fetch(uri)
            const personData = await result.json()
            updatePage(personData)
        } catch (error) {
            showError(error)
        }
    }

    function showError(mess) {
        messageare.innerHTML = `<p>${mess}</p>`
    }

    function updatePage(searchResult) {
        if (searchResult.message) {
            showError(searchResult.message)
        }
        else if (searchResult.length === 0) {
            showError('no person found')
        }
        else {

            let htmlString = ``;
            for (const person of searchResult) {
                htmlString += `<tr>
                <td>${person.firstName}</td>
                <td>${person.lastName}</td>
                <td>${person.age}</td>
                </tr>`
            }
          return resultset.innerHTML = htmlString
        }
    }
})()
