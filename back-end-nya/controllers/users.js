const JWT = require('jsonwebtoken');
const User = require('../models/user');
const {JWT_SECRET} = require('../configuration/index');
const url = 'mongodb://localhost/APIAuthentication';
const MongoClient = require('mongodb').MongoClient;

signToken = user =>{
    return JWT.sign({
        iss: 'ghass',
        sub: user._id,
        iat: new Date().getTime(), //current time
        exp: new Date().setDate(new Date().getDate() + 1) //current time + 1
    }, JWT_SECRET);
}

module.exports = {
    signUp: async (req,res, next)=>{
        console.log(' contents  of req.value.body', req.value.body)
        console.log('UserController.signUP() called!')
        const {email, password} = req.value.body;
           
        // CHECK IF THERE IS A USER WITH THE SAME EMAIL
        const foundUser = await User.findOne({ email })
        if (foundUser) {
            return res.status(403).send({ error: 'Email is already use'})
        }
        // CREATE A NEW USER
        const newUser = new User({email,password});
        await newUser.save();
 
        // GENERATE WITH TOKEN
        const token = signToken(newUser);

        // RESPOND WITH TOKEN
           res.status(200).json({ token : token })
    
    },
    signIn: async (req, res, next) => {
        // GENERATE TOKEN   
        console.log('UserController.signIn() called!')
        console.log('Successful login')
        console.log('req.user',req.user)
        const token = signToken(req.user);
        res.status(200).json({token})
    },
    secret: async (req, res, next) => {
        console.log('I managed to get here!');
        res.json({secret:"resource"})
    },
    dataku: async (req, res, next) =>{
        MongoClient.connect(url, (err, db) => {
            var collection = db.collection('biodata');
            collection.find({}).toArray((err, docs) => {
                console.log(docs);
                res.send(docs);
            });
        });

        // User.find((err, users)=>{
        //     res.send(users)
        // })
        console.log('I managed to get here!');
        
    },
} 