const jwt = require("jsonwebtoken");

const auth2 =  (id) => {
    return  jwt.sign(id,process.env.ACCESS_SECRETKEY,{
        expiresIn: '15s'
    });
}

module.exports = auth2;