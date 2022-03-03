const mongoose = require('mongoose');
const DB = process.env.DB;

mongoose.connect(DB,{
    useNewUrlParser: true,
    useUnifiedTopology:true
}).then(()=>{
    console.log('connection to database successful');
}).catch((err)=>{console.log('no connection' + err);})