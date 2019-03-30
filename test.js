const fetch  = require('node-fetch');
const assert = require('assert')

//test 1 - get the default
fetch("http://localhost:8080/temperature")
.then(async res => {
    let j = await res.json()
    console.log("Test #1")
    assert(j.hasOwnProperty('temperature'));
    assert(j.hasOwnProperty('query_time'));
    console.log("Passed test #1, no query")
})
.catch(err => {
    console.error("Test failed!!!")
})
//test 2 - a city placeholder
fetch("http://localhost:8080/temperature/Paris,France")
.then(async res => {
    let j = await res.json()
    console.log("Test #2")
    assert(j.hasOwnProperty('teperature'));
    assert(j.hasOwnProperty('query_time'));
    console.log("Passed test #2, Normal query")
})
.catch(err => {
    console.error("Test failed!!!")
})
//test 3 - City with space in name
fetch("http://localhost:8080/temperature/Los Angeles,California")
.then(async res => {
    let j = await res.json()
    console.log("Test #3")
    assert(j.hasOwnProperty('temperature'));
    assert(j.hasOwnProperty('query_time'));
    console.log("Passed test #3, city with a space in the name")  
})
.catch(err => {
    console.error("Test failed!!!")
})
//test 4 - Bad query
fetch("http://localhost:8080/temperature/B$!&")
.then(async res => {
    let j = await res.json()
    console.log("Test #4 - bad query, should return err")
    assert(j.hasOwnProperty('error'));
    console.dir(j)
})
.catch(err => {
    console.error("Test failed!!!")
})