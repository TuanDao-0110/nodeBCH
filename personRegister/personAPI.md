# Person API

## person.json

```json
[
  {
    "firstName": "joe",
    "lastName": "dan",
    "age": 40
  },
  {
    "firstName": "DONE",
    "lastName": "How",
    "age": 30
  },
  {
    "firstName": "han",
    "lastName": "chi",
    "age": 20
  },
  {
    "firstName": "tuan",
    "lastName": "dao",
    "age": 11
  }
]
```

## datalayer for persons

## function **search**

Function return an array of person objects. Search criterion is passed to the function as paramters. If parameters are missing, all persons will be returned.

- search() return an array of all persons
- search(key,value) return an array of all matching persons

If no match is found an empty array is returned.

## server usage

## search all persons

http://localhost:8080/persons
same origin fetch: /person

## search by first name

http://localhost:8080/persons/firstname?value=math

same origin fetch: /firstname

## search by last name

http://localhost:8080/persons/lastname?value=river
same origin fetch: /person/lastname?value

## search by age

http://localhost:8080/persons/age?value=30

same origin fetch: /person/age?value


## SPA (single page application)

uses fetch to get data to the browser.

## addtional infor

server also style and js
