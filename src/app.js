const express = require('express')
const bodyParser = require("body-parser");
const cors = require("cors");
const dbConfig = require("./config/db.config");
const path = require('path')
const hbs = require('hbs')
const fetch = require('node-fetch')
    // import geocode js and forecast js
const geocode = require('./utils/geocode.js')
const forecast = require('./utils/forecast.js')

console.log(__dirname)
    //console.log(__filename)
console.log(path.join(__dirname), '../public') // current directory find 

const app = express()
const port = process.env.PORT // get HeroKu Port  

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public'); // provide default html path from current dir + target dir
const viewsPath = path.join(__dirname, '../templates/views')
const partialPath = path.join(__dirname, '../templates/partials')

// setup dynamic page with handlebars (views) and view location
app.set('view engine', 'hbs') // 
app.set('views', viewsPath) // bond the views(view engine) to viewsPath
hbs.registerPartials(partialPath)


// set static html src directory to serve
app.use(express.static(publicDirectoryPath)) // use default index.html 


//JWT and DB
var corsOptions = {
    origin: "http://localhost:8081"
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// const db = require("./dbmodels");

// db.mongoose
//     .connect(`mongodb+srv://${dbConfig.USERNAME}:${dbConfig.PASSWORD}@${dbConfig.DB}?retryWrites=true&w=majority`, {
//         useNewUrlParser: true,
//         useUnifiedTopology: true
//     })
//     .then(() => {
//         console.log("Successfully connect to MongoDB.");
//     })
//     .catch(err => {
//         console.error("Connection error", err);
//         process.exit();
//     });

// // routes
// require("./routes/auth.routes")(app);
// require("./routes/user.routes")(app);


//setup url endpoint 
// send back json format

app.get('', (req, res) => {
    // connect index.hbs page
    res.render('index', {
        title: 'Weather App',
        name: 'Johnson Chong'
    })

})

app.get('/login', (req, res) => {
    if (!req.query.username || !req.query.password) {
        return res.send({
            error: "You must provide login name and password!"
        })
    }

    fetch('http://localhost:' + process.env.PORT + '/api/signin', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            username: req.query.username,
            password: req.query.password
        })
    }).then((response) => {
        response.json().then((data) => {
            if (!res.status(200)) {
                console.log(data.message);
                return res.send({
                    error: data.message
                })
            } else {
                //console.log(data.accessToken);
                res.send({
                    accessToken: data.accessToken,
                    background: data.background,
                    username: data.username,
                    error: data.message
                })
            }
        })
    })
})

app.get('/checkSession', (req, res) => {

    fetch('http://localhost:' + process.env.PORT + '/api/loginedPage', {
        method: 'GET',
        headers: {
            'x-access-token': req.query.accessToken
        }
    }).then((response) => {
        response.json().then((data) => {
            if (!res.status(200)) {
                console.log(data.message);
                return res.send({
                    error: data.message
                })
            } else {
                //console.log(data.background);
                res.send({
                    username: data.username,
                    background: data.background,
                    error: data.message
                })
            }
        })
    })

})

app.get('/changeTheme', (req, res) => {

    fetch('http://localhost:' + process.env.PORT + '/api/changeTheme?background=' + req.query.background, {
        method: 'GET',
        headers: {
            'x-access-token': req.query.accessToken
        }
    }).then((response) => {
        response.json().then((data) => {
            if (!res.status(200)) {
                console.log(data.message);
                return res.send({
                    error: data.message
                })
            } else {
                //console.log(data.background);
                res.send({
                    username: data.username,
                    background: data.background,
                    error: data.message
                })
            }
        })
    })

})

app.get('/about', (req, res) => {
    // connect about.hbs page
    res.render('about', {
        title: 'About',
        name: 'Johnson Chong'
    })
})

app.get('/help', (req, res) => {
    // connect help.hbs page
    res.render('help', {
        title: 'Help',
        helpText: 'This is some help Text',
        name: 'Johnson Chong'
    })

})

app.get('/weather', (req, res) => {
    // get request query
    if (!req.query.address) {
        return res.send({
            error: "You must provide address"
        })
    }

    // get geocode 
    geocode.geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
        if (error) {
            // send response with error
            return res.send({ error })
        }
        // forecast weather data 
        forecast.forecastAllQuery(longitude, latitude, (error, forecastData) => {
            if (error) {
                // send response with error
                return res.send({ error })
            }

            // send back reponse with success weather 
            res.send({
                currently: forecastData.currently,
                hourly: forecastData.hourly,
                daily: forecastData.daily,
                location
                // address: req.query.address
            })

        })
    })
})

app.get('/weatherGeolocate', (req, res) => {
    // get request query
    if (!req.query.latitude && !req.query.longitude) {
        return res.send({
            error: "You must provide latitude and longitued"
        })
    }

    // get geocode 
    geocode.RevserseGeocode(req.query.longitude, req.query.latitude, (error, { location } = {}) => {
        if (error) {
            // send response with error
            return res.send({ error })
        }
        // forecast weather data 
        forecast.forecast(req.query.longitude, req.query.latitude, (error, forecastData) => {
            if (error) {
                // send response with error
                return res.send({ error })
            }

            // send back reponse with success weather 
            res.send({
                currently: forecastData.currently,
                hourly: forecastData.hourly,
                daily: forecastData.daily,
                location
                // address: req.query.address
            })

        })
    })
})

app.get('/weatherGeolocateAll', (req, res) => {
    // get request query
    if (!req.query.latitude && !req.query.longitude) {
        return res.send({
            error: "You must provide latitude and longitued"
        })
    }

    // get back geocode 
    geocode.RevserseGeocode(req.query.longitude, req.query.latitude, (error, { location } = {}) => {
        if (error) {
            // send response with error
            return res.send({ error })
        }
        // forecast weather data 
        forecast.forecastAllQuery(req.query.longitude, req.query.latitude, (error, forecastData) => {
            if (error) {
                // send response with error
                return res.send({ error })
            }
            // console.log("Currently: ");
            // console.log(forecastData.currently);
            // console.log("hourly0: ");
            // console.log(forecastData.hourly.data[0]);
            // console.log("daily0: ");
            // console.log(forecastData.daily.data[0]);
            // send back reponse with success weather 
            res.send({
                currently: forecastData.currently,
                hourly: forecastData.hourly,
                daily: forecastData.daily,
                location
                // address: req.query.address
            })

        })
    })
})

app.get('/products', (req, res) => {
    // get request query
    if (!req.query.search) {
        return res.send({
            error: "You must provide a search term"
        })
    }

    // console.log(req.query.search)
    //send back json
    res.send({
        products: []

    })

})

// endpoint specific match any help/* endpoint will show specific message
app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Johnson Chong',
        errorMessage: 'Help article not found.'
    })

})

// handle all invalid url (response 404 page)
app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Johnson Chong',
        errorMessage: 'Page not found.'
    })

})

app.listen(port, () => {
    console.log('Server is up on port ' + port)
})