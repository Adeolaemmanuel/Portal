const express = require('express');
const bodyParser = require('body-parser')
const path = require('path');
const cors = require('cors')
const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
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
    const db = client.db('portal')
    const usersColl = db.collection('Users')
}, err=>{
    console.log(err);
})

app.get('/', function (req, res) {
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
            if(user['_id'] == req.body.id && user['password'] == req.body.pass){
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

app.get('/getUsers', (req,res)=>{
    var db = client.db('portal')
    var usersColl = db.collection('Users')
    const data = usersColl.find({}).toArray().then(users=>{
        res.json({
            users: users
        })
    })
})

app.post('/register', (req,res)=>{
    var db = client.db('portal')
    var usersColl = db.collection('Users')
    usersColl.insertOne({
        '_id': req.body.id,
        user: req.body.user,
        password: req.body.pass
    }).then(arr=>{
        console.log(arr);
    })
})

app.listen(process.env.PORT || 1996, ()=>{
    console.log(`http://localhost:${1996}`);
});