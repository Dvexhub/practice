const express = require("express");
const router =  express.Router();

router.get('/',(req,res)=>{
    res.send("test Home");
})
router.get('/data',(req,res)=>{
    res.send("data");
});

module.exports = router;