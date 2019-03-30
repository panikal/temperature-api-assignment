//dependencies
const restify = require('restify');
const fetch   = require('node-fetch');
const sqlite3 = require('sqlite3');
const upsert  = require('sqlite3-upsert')
const moment  = require('moment');

// Allow to stop with npm stop
process.title = process.argv[2];

//initialize SQLite DB connection
let db = new sqlite3.Database('./weather.db', sqlite3.OPEN_READWRITE, (err) => {
  if (err) {
    console.error(err.message);
  }
  console.log('Connected to the weather database.');
});

var upsert_temperature = upsert({table: 'temperature', key: 'city', db: db})

//global var initialization
let apiurl  = "http://api.openweathermap.org/data/2.5/weather?q=";
let apikey  = "00180910e96d7652452ab3541959f28b";
let kelvin = 273.15; //C -> K constant

//Main Server Setup
var server  = restify.createServer();
server.get('/temperature', tempQuery);
server.get('/temperature/:city', tempQuery);
server.listen(8080, function() {
    console.log('%s listening at %s', server.name, server.url);
});


// controller functions
async function tempQuery(req, res, next) {
    // By default assignment requires data for Portland, Oregon
    let city = "Portland,Oregon";
    // if a city param exists, we'll override our default
    if (req.params.hasOwnProperty('city')) {
        city = req.params.city;
    }
    city = city.replace(", ", ",")
    let temp = await get_temperature(city);
    res.send(temp);
}

// Helper functions

function get_weather_data(city, now) {
    return fetch(apiurl + city + "&appid=" + apikey)
    .then(async res => {
        let json = await res.json();
        if (json.hasOwnProperty("main")) {
            let temperature = Math.round((json.main.temp - kelvin) * 10)/10;
            // upsert to API
            update_to_db(city, temperature, now);
            return temperature
        }
        else {
            return
        }
    })
    .catch(err => {
        return
    })
}

function query_from_db(city) {
    return new Promise((resolve,reject) => {
        db.all("SELECT * from temperature where city = ?", [city], function(err, row) {
            if (err) {
                return reject({err : err})
            }
            if (row) {
                //we'll take the first result, should never be more than a single result in DB
                return resolve(row[0])
            }
        })
    })
}

function update_to_db(city, temperature, time) {
    upsert_temperature({city: city, temperature: temperature, time: Number(time)})
}

async function get_temperature(city) {
    //lets get the date in Unix time, easier for math
    let now = await moment.unix(new Date);
    // first get the data from the DB
    return query_from_db(city, now)
    .then(async city_data => { 
        let temperature;
        // division by 1000000 to change to seconds from epoch ns for easier reading
        if (city_data) {
            let skew = (now - city_data.time) / 1000000;
            if (skew < 300) {
                console.log("Cached data returned, time skew is " + skew)
                temperature = city_data .temperature
            }
            else {
                console.log("Time skew more than 5 mins, " + skew + " secs - getting results")
                temperature = await get_weather_data(city, now);
            }
        }
        // its the first time we're querying the data so DB returned nothing
        else {
            temperature = await get_weather_data(city, now);
        }
        // If there's no temperature, either API is broken or a bad city query
        if (!temperature) {
            return {error: "Error retreiving weather from API"}
        }
        // We made it here, all is OK, return our data
        return { temperature: temperature, query_time: moment().format('llll') }
    })
    .catch(err => {
        return { error: err }
    })
}