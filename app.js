const express = require('express');
const app = express();
const bodyParser= require('body-parser');

const Routes = require('./routes')

app.use(bodyParser.urlencoded({
    extended : true
}));
app.use(bodyParser.json());

app.get('/', function (req, res) {
  res.send('Hello World!')
})

const mongoose = require('mongoose');
database = 'mongodb://localhost:27017/tp1data834';
mongoose.connect(database,(err)=>{
    if(err)
        throw err;
    console.log('Connected to the database')
});

app.use(Routes);

app.listen(3000);
console.log("Waiting on localhost:3000");

module.exports = app