const express = require('express')
const router = express.Router()
const User = require('../schema/user');
var jwtFunctions= require('../model/jwtfun.js');
const mongoose = require('mongoose');


var invalidRequestError={
    "name":"INVALID_REQUEST",
    "code":"INVALID_REQUEST",
    "msg" : "your request has been rejected due to invalid request parameters",
    "status":"error"
};
var userCreateError={
    "name":"ERROR_IN_USER_CREATE",
    "code":"ERROR_IN_USER_CREATE",
    "msg" : "Oops!! Something went wrong while creating user. Please contact support.",
    "status":"error"
};
// this method is just created for static token for now
router.get('/getToken',async(req,res)=>{
    var token=await jwtFunctions.createJWTToken();
    res.status(200).json({"message":"User created successfully","res":token});
});
router.post('/', async (req, res) => {
    const user=mongoose.model("user");;
    try {
        const newuserList = await user.insertMany(req.body);
        
        if(newuserList){
            res.status(200).json({"message":"User created successfully","res":newuserList});
        
        }else{
            res.status(200).json(userCreateError)
        }
    } catch (e) {
        console.log(e);
        res.status(200).json(userCreateError)
    }   
});
module.exports = router;