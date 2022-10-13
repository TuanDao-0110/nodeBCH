# JSON (Javascrip Object Notation)

## Documentation

https://www.json.org

## File expension

.json

## Values

- string
- number
- array
- object
- true
- false
- null

### examples

### string

Must be Doublequoted

empty String:

""

```json
"this is a string"
"Here is a \"quote\" in the 'middle' "
"hearts symbol is \u2665"
```

### Number

- no leading +
- only one leading 0
- decimal delimiter is.

These are allowed:

```json
0,0.5, 345.567, 12000, 1.5E10, 2E -2, 2E+2, -1, -11.5, -0.56
```

These are not allowed:

```json
0000.34, +20, 00030
```

### Array

Array begn with [ and ends with ]. Values in array are separated by a comma.

### examples

```json
[1,2,3,4,5]
["textA","textB"]
[true, null, false]
[{
    "name":"tuan"
},
{
    "name":"long"
}
]
[
    [1,2,3]
    [4,5,6]
    ]

```
