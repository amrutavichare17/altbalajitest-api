const express = require('express');
const app = express();
const mongoose = require('mongoose');
var jwtFunctions= require('./model/jwtfun.js');


app.use(function (req, res, next) {
    // This is for CORS We can add whatever website which we want to allow.
    const allowedOrigins = ['https://altbalaji.com', 'https://www.altbalaji.com/'];
    const origin = req.headers.origin;
    if (allowedOrigins.includes(origin)) {
         res.setHeader('Access-Control-Allow-Origin', origin);
    }else{
      res.setHeader('Access-Control-Allow-Origin', 'https://altbalaji.com');
    }
  
    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  
    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'authorization,X-Requested-With,content-type');
  
    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);
  
    // Pass to next layer of middleware
    next();
  });
  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());
  // Listen On port
  var startListning = () => {
    app.listen(process.env.PORT || 8089, () => console.log('server started'+ 8089));
    mongoose.set("debug",true);
  };
  // Router Config
  var ROOT_PATH = "/api";
  const userConfig = require('./routes/userrouter');
  app.use( ROOT_PATH + '/users',jwtFunctions.verifyRequest, userConfig);
 // mongoose.connect("mongodb://localhost:27017/altbalaji", { useNewUrlParser: true })
 // Connect with database
  mongoose.connect("mongodb+srv://amruta:amruta@123@altbalaji.sr90e.mongodb.net/altbalaji?retryWrites=true&w=majority", { useNewUrlParser: true })
  const db = mongoose.connection
  db.on('error', (error) => console.error(error))
  db.once('open', startListning )
  module.exports = app