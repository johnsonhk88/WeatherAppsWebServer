const express = require('express')

const app = express()

//setup url endpoint 

app.get('', (req, res)=> {
    res.send('Hello express!') //body


})

app.get('/help', (req, res)=> {
    res.send('<em>Help Page!</em>') //body


})

app.get('/about', (req, res)=>{
    res.send('<h2>About Page!</h2>') //body

})

app.get('/weather', (req, res)=>{

    res.send('<h4>Your Weather Apps!</h4>') //body
})

//app.com 
//app.com/help
//app.com/about

app.listen(3000, ()=>{
    console.log('Server is up on port 3000.')
})