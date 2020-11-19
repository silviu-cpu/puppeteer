const express = require('express')
const axios = require('axios')
var bodyParser = require('body-parser')
var process = require('./stackoverflow.js')

const app = express()
const port = 3000

app.use(bodyParser.urlencoded({extended:true}))
app.set("view engine", "ejs");



app.get('/', (req,res) => {
    
    axios.get('http://api.icndb.com/jokes/15')
        .then(resp => {
            res.render("gluma", {raspunsVar: resp.data.value.joke})
        })
          
});

app.post('/add', async (req,res) =>{
    
    var query = String(req.body.primul);
    var offset = 1;
    var results = [];
    
    results.push(await process.newName({query,offset}));
    
    res.render("stack",{results: results})
})

app.get('/*', (req,res) => {
    res.render("error")
})

app.listen(port, () => {

    console.log(`Example app listening at http://localhost:${port}`)
})