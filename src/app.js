const express = require('express')
const path = require('path')
const hbs = require('hbs')
// import geocode js and forecast js
const geocode = require('./utils/geocode.js')
const forecast = require('./utils/forecast.js')

console.log(__dirname)
//console.log(__filename)
console.log(path.join(__dirname), '../public') // current directory find 

const app = express()

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public'); // provide default html path from current dir + target dir
const viewsPath = path.join(__dirname, '../templates/views')
const partialPath = path.join(__dirname, '../templates/partials')

// setup dynamic page with handlebars (views) and view location
app.set('view engine', 'hbs')   // 
app.set('views', viewsPath)   // bond the views(view engine) to viewsPath
hbs.registerPartials(partialPath)


// set static html src directory to serve
app.use(express.static(publicDirectoryPath)) // use default index.html 

//setup url endpoint 
// send back json format


app.get('', (req, res)=>{
    // connect index.hbs page
    res.render('index', {
        title: 'Weather App',
        name: 'Johnson Chong'
    })

})

app.get('/about', (req, res)=>{
    // connect about.hbs page
      res.render('about', {
        title: 'About Me',
        name: 'Johnson Chong'
    })  
})

app.get('/help', (req, res)=>{
    // connect help.hbs page
    res.render('help', {
        title: 'Help',
        helpText: 'This is some help Text',
        name: 'Johnson Chong'
    })  
    
})

app.get('/weather', (req, res)=>{
    // get request query
    if(!req.query.address) {
        return res.send({
            error: "You must provide address"
        })
    }

    // get geocode 
    geocode(req.query.address, (error, {latitude, longitude, location}={})=>{
        if(error) {
            // send response with error
            return res.send({error})
        }
        // forecast weather data 
        forecast(longitude, latitude, (error, forecastData)=> {
            if(error) {
                // send response with error
                return res.send({error})
            }

            // send back reponse with success weather 
            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })

        })
    })
})

app.get('/products', (req, res)=>{
     // get request query
    if(!req.query.search) {
       return res.send({
         error: "You must provide a search term"
     })
    }
   
    console.log(req.query.search)
    //send back json
    res.send({
        products: []

    })

})

// endpoint specific match any help/* endpoint will show specific message
app.get('/help/*', (req, res)=>{
    res.render('404', {
        title: '404',
        name: 'Johnson Chong',
        errorMessage: 'Help article not found.' 
    })

})

// handle all invalid url (response 404 page)
app.get('*', (req, res) =>{
    res.render('404', {
        title: '404',
        name: 'Johnson Chong',
        errorMessage: 'Page not found.' 
    })

})

app.listen(3000, ()=>{
    console.log('Server is up on port 3000.')
})