const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const auth2 = require("../middleware/auth2");

const yoschema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email:{
        type:String,
        required:true
    },
    phone:{
        type:Number,
        required: true
    },
    password:{
        type:String,
        required: true
    },
    cpassword:{
        type:String,
        required: true
    }
});

//encryting password
yoschema.pre('save',async function(next){
    if(this.isModified('password'))
    {
        this.password = await bcrypt.hash(this.password,12);
        this.cpassword = await bcrypt.hash(this.cpassword,12);
    }
    next();
});

//generate Jwt token
yoschema.methods.generateAuthToken = async function(){
    try {
        const id = {
            _id:this._id
        }
        const accesstoken = await auth2(id);
        const refreshToken = await jwt.sign(id,process.env.REFRESH_TOKEN_SECRETKEY);
        return {
            token:accesstoken,
            refreshToken:refreshToken
        };
    } catch (error) {
        console.log(error);
    }
}
const Mytest = mongoose.model('test',yoschema);

module.exports = Mytest;
