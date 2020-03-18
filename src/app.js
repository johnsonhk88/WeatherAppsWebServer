const express = require('express')
const path = require('path')
const hbs = require('hbs')

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
    // send back response with JSON 
    res.send({
        forecast:"Today is raining",
        location: "Hong Kong"
    }) //body
})

//app.com 
//app.com/help
//app.com/about

app.listen(3000, ()=>{
    console.log('Server is up on port 3000.')
})