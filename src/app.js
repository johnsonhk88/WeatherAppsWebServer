const express = require('express')

const app = express()

//setup url endpoint 

app.get('', (req, res)=> {
    res.send('<h1>Weather</h1>') //body


})

// send back json format
app.get('/help', (req, res)=> {
    res.send([{
                name: 'Andrew'
            },
            {
                name: 'Johnson'
            }
        ]) //body


})

app.get('/about', (req, res)=>{
    res.send('<h1>About</h1>') //body

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