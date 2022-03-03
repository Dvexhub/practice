const jwt = require("jsonwebtoken");
const express = require("express");
const router =  express.Router();
const Mytest = require('../Modals/test'); // Database Schema and it is used for acquiring data
require('dotenv').config();

//test
router.get('/',(req,res)=>{
    res.send("Home Data");
})

//getting data
router.get('/data',  async function(req,res){
    const data = await Mytest.find();
    res.send(data,null,2);
});

//register user
router.post('/register',async function(req,res){ 
    try {
        // let token;
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
        // else{
            // token = await userExist.generateAuthToken();
            // console.log(token);
        // }
        const user = new Mytest({name,email,phone,password,cpassword});

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
router.post('/singIn',async function(req,res){
    const {email,password} = req.body;

    if(!email || !password)
    {
        return res.status(422).json({message:"please fill all the details"});
    }

    const emailExist = await Mytest.findOne({email:email});
    
    // TODO
})

// Delete data with id(Only delete on user with that particular id)  
router.delete('/deleteUser/:id',async function(req,res){
    try {
        const id = req.params.id;
        const deleteUser = await Mytest.findByIdAndDelete(id);
        if(!deleteUser)
        {
            return res.status(400).send();
        }
        res.send(deleteUser);
    } catch (err) {
            res.status(500).send(err);
    }   
});

// updating data 
router.patch('/updatedetails/:id', async function(req,res){
    try {
        const _id = req.params.id;
        const updateDetails = await Mytest.findByIdAndUpdate(_id,req.body,{
            new:true
        });
        res.send(updateDetails);
    } catch (error) {
        res.status(400).send(error);
    }
});

module.exports = router;