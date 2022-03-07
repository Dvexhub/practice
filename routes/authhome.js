const express = require("express");
const router =  express.Router();
const Mytest = require('../Modals/test'); // Database Schema and it is used for acquiring data
const bcrypt = require("bcryptjs")
const cookieParser = require('cookie-parser');
const jwt = require("jsonwebtoken");

router.use(cookieParser());
require('dotenv').config();


let allRefresh = [];
//creating new tokens 


router.post('/token',async (req,res)=>{
    console.log("token.......");
    const refreshToken = req.body.token;
    if(allRefresh == null) return res.status(401);
    if(!allRefresh.includes(refreshToken)) return res.status(403);

    await jwt.verify(refreshToken,process.env.REFRESH_TOKEN_SECRETKEY,(err,user)=>{
        if(err) return res.status(err)
        // const userExist =  Mytest.findOne({user:user});
        const myaccesstoken = Mytest.methods.generateAuthToken();
        res.json({accesstoken:myaccesstoken.accesstoken,message:"refresh token generated"});
    });
    
})

//register user
router.post('/register',async function(req,res){ 
    try {
        
        const {name,email,phone,password,cpassword} = req.body;
        if(!name || !email || !phone || !password || !cpassword)
        {
            return res.status(422).json({message:"please fill all the details"});
        }
        if(password != cpassword)
        {
            return res.status(422).json({message:"password are not same"})
        }        
        const userExist = await Mytest.findOne({email:email});
        if(userExist)
        {
            return res.status(422).json({message:"User already exists"});
        }
        const user = new Mytest({name,email,phone,password,cpassword});
        //HAShING password over here in the modal test file-----------
        const userRegister = await user.save();
        if(userRegister)
        {
            res.status(201).json({message:"Registered successfully"});
        }else{
            res.status(500).json({message:"Failed to register"});
        }
        
    } catch (error) {
        console.log(error);
    }
})

// singin 
router.post('/signin',async function(req,res){
    
    console.log("signin");
    const {email,password} = req.body;
    if(!email || !password)
    {
        return res.status(422).json({message:"please fill all the details"});
    }
    const userLogin = await Mytest.findOne({email:email});
    if(userLogin)
    {
        const mytokens= await userLogin.generateAuthToken();
        allRefresh.push(mytokens.refreshToken);
        const isMatch = await bcrypt.compare(password,userLogin.password)

        if(!isMatch)
        {
            res.status(400).json({error:'Invalid credentials'});
        }else{
            res.json({
                accesstoken: mytokens.token,
                refreshToken: mytokens.refreshToken,
                message:"user login successfully"});
        }
    }else{
        res.status(400).json({error:"Invalid credentials"});
    }

    
});




module.exports = router;