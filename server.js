const express = require('express');
const app = express();
const bodyParser = require('body-parser')
const fs = require('fs')


app.use(express.static(__dirname + '/public'));

let rawdata = fs.readFileSync('data.json');
let data = JSON.parse(rawdata);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
  
app.post('/', (req, res) => {
    let name = req.body.name;
    //Converting to lower case to make application case insensitive
    let modName = name.toLowerCase()
    let nameArr = modName.split(' ')
    //Obtaining first and last names from request bosy
    let firstName = nameArr[0];
    let lastName = nameArr[1];
    //Filtering to find matching person in the data.json file
    let obj = data.filter(person=>{
        if(person.first_name.toLowerCase() == firstName && person.last_name.toLowerCase() == lastName){
            return person
        }
    })
    //Preparing data to send back to the client
    let newObj = JSON.stringify(obj)

    res.send({newObj})
})
app.listen(8080);
