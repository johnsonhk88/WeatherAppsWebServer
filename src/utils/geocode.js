//import npm request module for HTTP client
const request = require('request')

// Create Geocode API
const geocode = (address, callback) => {
    const geocodeURL = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1Ijoiam9obnNvbmhrODgiLCJhIjoiY2s3ZW1vc2cwMGFlOTNkbzNlOHB4MjNrciJ9.wLVjWugvwohASACi4Z59kw&limit=1';

    request({url:geocodeURL, json: true}, (error, {body})=> {
        // check error 
        if(error)
        {
           callback('Unable to connect to location Services!',undefined) // pass error 
        } else if(body.features.length ===0) {
            // no data
            callback('Unable to find location.Try another search',undefined) // pass error 

        } else {

            // const latitude = response.body.features[0].center[1];
            // const longitude = response.body.features[0].center[0];
            // console.log("Centre: "+ latitude + ' ' + longitude);
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            } );
        }
    });

}

module.exports = geocode ;