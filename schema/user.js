const mongoose = require('mongoose');
var userSchema=mongoose.Schema({
    id:{
        type: Number,
        required: true ,
        unique: true
    },
    name: {
        type: String,
        required: true
    },
    dob: {
        type: String,
        required:true
    },
    address:{
        type:String,
        required:true
    },
    state:{
        type:String,
        required:true
    },
    createdAt:{
        type: Date,
        default: Date.now
    }
});
module.exports=mongoose.model('user', userSchema);