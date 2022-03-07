// const jwt = require("jsonwebtoken");
const express = require("express");
const router =  express.Router();
const Mytest = require('../Modals/test'); // Database Schema and it is used for acquiring data
const bcrypt = require("bcryptjs")
const cookieParser = require('cookie-parser');
router.use(cookieParser());
require('dotenv').config();

const auth = require('../middleware/auth');
//test for cookies
router.get('/secret',auth, (req,res)=>{
    res.send("Home Data");
})

//getting data
router.get('/data',auth ,async function(req,res){
    const data = await Mytest.find()
    res.send(data);    
});


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