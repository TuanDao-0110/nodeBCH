'use strict'


const adapt = (item) => {
    return {
        id: Number(item.id),
        firstname: item.firstname,
        lastname: item.lastname,
        department: item.department,
        salary: Number(item.salary) // also Number(item.salary)
    }
}

module.exports = { adapt }