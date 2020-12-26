const express = require('express');
const bodyParser = require('body-parser')
//var request = require('request');
const path = require('path');
const cors = require('cors')
//const assert = require('assert');
//const { ifError } = require('assert');
const app = express();
app.use(cors({origin:"*"}));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json({'contentType': "application/json"}));
app.use(express.static(path.join(__dirname, 'build')));


app.get('/*', function (req, res) {
  res.sendFile(path.resolve(__dirname, 'build', 'index.html'));
});


let port = 3000

app.listen(process.env.PORT || port, ()=>{
    console.log(`http://localhost:${port}`);
});