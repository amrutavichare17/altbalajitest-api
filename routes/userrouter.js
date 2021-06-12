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
var userNotFoundVerifyError={
    "name":"USER_NOT_FOUND",
    "status":"error",
    "message":"User not found",
    "code":"53360"
};
// this method is just created for static token for now
router.get('/getToken',async(req,res)=>{
    var token=await jwtFunctions.createJWTToken();
    res.status(200).json({"message":"User created successfully","res":token});
});
// Create All User 
router.post('/', async (req, res) => {
    const user=mongoose.model("user");
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
// Get All User 
router.get('/', async (req, res) => {
    try {
        // Find all user
        const user = await User.find();
        res.json(user);
    } catch (e) {
        res.status(500).json({ message: e.message });
    }
});
// Get User by id 
router.get('/:id', async (req, res) => {
    try {
        // Find user by id. Here id is int which is in your requirment 
        const user = await User.findOne({"id":req.params.id});
        if(user){
            res.json(user);
        }else{
            res.status(500).json(userNotFoundVerifyError);
        }   
    } catch (e) {
        res.status(500).json({ message: e.message });
    }
});
module.exports = router;