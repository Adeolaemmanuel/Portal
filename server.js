const express = require('express');
const bodyParser = require('body-parser')
var request = require('request');
const path = require('path');
const cors = require('cors')
const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
const { ifError } = require('assert');
const app = express();
app.use(cors({origin:"*"}));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json({'contentType': "application/json"}));
app.use(express.static(path.join(__dirname, 'build')));


//Mongodb Database connecntion
let url = "mongodb+srv://Orisha:Neutron@cluster0.kuv4w.mongodb.net/portal?retryWrites=true&w=majority";
const client = new MongoClient(url, {useUnifiedTopology: true});
client.connect().then(res=>{
    console.log('Connected!');
}, err=>{
    console.log(err);
})

app.get('/*', function (req, res) {
  res.sendFile(path.resolve(__dirname, 'build', 'index.html'));
});



app.post('/home', (req,res)=>{
    var db = client.db('portal')
    var usersColl = db.collection('Users')
    usersColl.findOne({"_id": req.body.id}, (err, user)=>{
        if(err){
            res.json('error')
        }else{
            console.log(user);
            if(user['_id'] === req.body.id && user['password'] === req.body.pass){
                res.json({
                    logged:true, 
                    user: user['user'],
                    id: user['_id'],
                    password: user['password']
                })
            }
        }
    })
})

app.post('/getUsers', (req,res)=>{
    var db = client.db('portal')
    var usersColl = db.collection('Users')
    usersColl.find({}).toArray().then(users=>{
        console.log(users);
        res.json({
            users: users
        })
    })
})

app.post('/register', (req,res)=>{
    var db = client.db('portal')
    var usersColl = db.collection('Users')
    usersColl.findOne({'_id':req.body.id},(err,arr)=>{
        if(arr === req.body.id){
            res.json({message:'id exist'})
        }else{
            usersColl.insertOne({
                '_id': req.body.id,
                user: req.body.user,
                password: req.body.pass
            }).then(arr=>{
                console.log(arr);
                res.json({message:'success'})
            })
        }
    })
})

app.post('/profile', (req,res)=>{
    var db = client.db('portal')
    var usersColl = db.collection('Details')
    usersColl.findOne({'_id':res.body.id}, (err,id)=>{
        if(err){
            console.log(err);
            usersColl.insertOne(res.body)
        }else{
            if(id === res.body.id){
                usersColl.updateOne({
    
                })
            }
        }
    })
})

app.post('/courseForm',(req,res)=>{
    console.log(req.body);
})
let port = 3000

app.listen(process.env.PORT || port, ()=>{
    console.log(`http://localhost:${port}`);
});