# Employee data storage

## employee.json

```json
[
  {
    "id": 1,
    "firstname": "leila",
    "lastname": "ok",
    "department": "ict",
    "salary": 4000
  },
  {
    "id": 2,
    "firstname": "matt",
    "lastname": "joe",
    "department": "ict",
    "salary": 3000
  }
]
```

id is uinique.

### public API (methods of Datastorage class)

#### datastorageLayer.js

- getAll()
  - returns an array of all employee / []
- getOne(id)
  - returns an employee object / NOT_FOUND
- insert(newEmployee)
  - returns INSERT_OK / NOT_INSERTED / AlREADY_IN_USE
- update(updatedEmployee)
  - returns UPDATE_OK / NOT_UPDATED
- remove(id)
  - REMOVE_OK / NOT_FOUND / NOT_REMOVED
- getters for status codes
  - returns an array of status codes

### Private API

#### readerWriter.js

-readStorage(storageFile)
  -returns an array of employees / []

- writeStorage(storageFil,data)
  -returns true/false

#### storageLayer.js

- getAllFromStorage()
  - returns an array of employees / []
- getFromStorage(id)
  - returns an employee object / null
- addToStorage(newEmployee)
  - returns true / false
- updateStorage(updatedEmployee)
  - returns true / false
- removeFromStorage(id)
  - returns true / false

#### statusCodes.js

```
js

const CODES = {
  PROGRAM_ERROR:0,
  NOT_FOUND:1,
  INSERT_OK:2,
  ...
}
```

The format of an status/error message is :

```js
const MESSAGES = {
  PROGRAM_ERROR: () => ({
    message: "Sorry! Error in our program",
    code: CODES.PROGRAM_ERROR,
    type: "error",
  }),
  NOT_FOUND: (id) => ({
    message: `No employee found with id ${id}`,
    code: CODES.NOT_FOUND,
    type: "error",
  }),
  INSERT_OK: (id) => ({
    message: `Employee ${id} was inserted`,
    code: CODES.INSERT_OK,
    type: "info",
  }),
};
```
status type are `error` or `info` 