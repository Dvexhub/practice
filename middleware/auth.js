const jwt = require("jsonwebtoken");

const auth = async (req,res,next) => {
    const authHeader=req.header('authorization');
    const token = authHeader && authHeader.split(' ')[1];
    if(token == null) return res.status(401).json({message:"You can't access this page"});
    try {
        await jwt.verify(token,process.env.ACCESS_SECRETKEY,(err,user) => {
            if(err){
                return res.status(403).json({error:"error in verifying token"});
            }else{
                req.user = user;
                next();
            }
        }); 
    } catch (error) {   
        res.status(401).send(error);
    }
}

module.exports = auth;