const express = require('express');
const bodyParser = require('body-parser')
const path = require('path');
const cors = require('cors')
const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
const app = express();
app.use(cors({origin:"*"}));
app.use(express.static(path.join(__dirname, 'build')));


//Mongonodb Database connecntion
let url = "mongodb+srv://Orisha:Neutron@cluster0.kuv4w.mongodb.net/portal?retryWrites=true&w=majority";
const client = new MongoClient(url, {useUnifiedTopology: true});
client.connect().then(res=>{
    console.log('Connected!');
    const db = client.db('portal')
    const usersColl = db.collection('Users')
}, err=>{
    console.log(err);
})

app.get('/', function (req, res) {
  res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
});

app.post('/login', (req,res)=>{
    var db = client.db('portal')
    var usersColl = db.collection('Users')
    console.log(req.body);
    usersColl.findOne({"_id":'Admin'}, (err, user)=>{
        if(err){
            res.json('error')
        }else{
            if(user['user'] == '' && user['password'] == ''){
                res.json(true)
            }
        }
    })
})

app.listen(process.env.PORT || 1996);