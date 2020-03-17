const express = require('express')
const path = require('path')

console.log(__dirname)
//console.log(__filename)
console.log(path.join(__dirname), '../public') // current directory find 

const app = express()
const publicDirectoryPath = path.join(__dirname, '../public'); // provide default html path from current dir + target dir

// set static html src directory
app.use(express.static(publicDirectoryPath)) // use default index.html 
//setup url endpoint 
// send back json format


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