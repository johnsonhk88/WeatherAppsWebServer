//import npm request module for HTTP client
const request = require('request');

const forecast = (longitude, latitude, callback) => {

    const url = 'https://api.darksky.net/forecast/f25c233a48a637b46f9525d5cdcbb37f/' +  latitude + ',' + longitude +'?units=si&lang=zh-tw';

    request({url, json: true}, (error, {body})=> {
    
            // const data = JSON.parse(response.body);
            // console.log(data.currently); // get currently weather 
            // console.log(response.body.currently);
            if(error)
            {
               callback('Unable to connect to weather Services!',undefined); // pass error 
            
            } else if (body.error) {
                // console.log('Error code:'+ response.body.error)
                callback('Unable find location', undefined);  // pass error
            } 
            else
            {
                callback(undefined, body.daily.data[0].summary + ' It is currently '+ body.currently.temperature + 
                             ' degree out. This high today is '+ body.daily.data[0].temperatureHigh + ' with a low of '+ body.daily.data[0].temperatureLow +'. There is a ' + body.currently.precipProbability
                             + '% chance of rain.');
            }
        })


}


module.exports = forecast;