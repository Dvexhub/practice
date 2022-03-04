const jwt = require("jsonwebtoken");
const Mytest = require('../Modals/test');

const auth = async (req,res,next) => {
    try {
        const token = req.cookies.jwt;
        const verifyUser = await jwt.verify(token,process.env.ACCESS_SECRETKEY); 
        // console.log(verifyUser);
    } catch (error) {   
        res.status(401).send(error);
    }
    next();
}

module.exports = auth;