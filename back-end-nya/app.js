const express       = require('express');
const morgan        = require('morgan');
const bodyParser    = require('body-parser');
const mongoose      = require('mongoose');
const cors          = require('cors');
const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost/APIAuthentication';


MongoClient.connect(url, (err, db) => {
    console.log("terhubung ke mongodb");
});

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/APIAuthentication');



const app = express('')

// Middleware
app.use(cors())
app.use(morgan('dev'));
app.use(bodyParser.json());

// Routes
app.use('/users', require('./routes/users'));

// Start the server
const port = process.env.PORT || 3000;
app.listen(port,()=>{
    console.log(`Server listening at ${port}`);
});
