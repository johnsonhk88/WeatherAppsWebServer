//import npm request module for HTTP client
const request = require('request');

const forecast = (longitude, latitude, callback) => {

    const url = 'https://api.darksky.net/forecast/' + process.env.DARKSKY_API_KEY + '/' + latitude + ',' + longitude + '?units=si'; //&lang=zh-tw';

    request({ url, json: true }, (error, { body }) => {

        // const data = JSON.parse(response.body);
        // console.log(data.currently); // get currently weather 
        // console.log(response.body.currently);
        if (error) {
            callback('Unable to connect to weather Services!', undefined); // pass error 

        } else if (body.error) {
            // console.log('Error code:'+ response.body.error)
            callback('Unable find location', undefined); // pass error
        } else {
            // console.log(body.hourly.data[0]);
            // body.daily.data[0].summary + ' It is currently ' + body.currently.temperature +
            // ' degree out. This high today is ' + body.daily.data[0].temperatureHigh + ' with a low of ' + body.daily.data[0].temperatureLow + '. There is a ' + body.currently.precipProbability +
            // '% chance of rain.'

            callback(undefined, {
                currently: body.currently,
                hourly: body.hourly,
                daily: body.daily
            });
        }
    })


}


const forecastAllQuery = (longitude, latitude, callback) => {

    const url = 'https://api.darksky.net/forecast/' + process.env.DARKSKY_API_KEY + '/' + latitude + ',' + longitude + '?units=si&lang=zh-tw';

    request({ url, json: true }, (error, { body }) => {

        // const data = JSON.parse(response.body);
        console.log(body.currently); // get currently weather 
        // console.log(response.body.currently);
        if (error) {
            callback('Unable to connect to weather Services!', undefined); // pass error 

        } else if (body.error) {
            // console.log('Error code:'+ response.body.error)
            callback('Unable find location', undefined); // pass error
        } else {
            callback(undefined, {
                // timeZone: body.timeZone,
                // time: body.time,
                currently: body.currently,
                hourly: body.hourly,
                daily: body.daily
            });
        }
    })


}

function timeStampToDate(t) {

    var milliseconds = t * 1000;
    var dateObject = new Date(milliseconds);

    return dateObject.toLocaleString();
}


module.exports = {
    forecast,
    forecastAllQuery
}