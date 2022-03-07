const express = require('express') // exprss framework
const app = express();
require('dotenv').config(); //necessary for reading the env file
const cookieParser = require('cookie-parser');
const cors = require('cors')

const TestRouter = require('./routes/test') // importing routes for test
const HomeRouter = require('./routes/authhome')  // importing routes for home
// const database = require('./Database/Connection')
const PORT = process.env.AUTHPORT; //Getting port number from the env file

//database connection
require('./Database/Connection');



app.use(cors())

// to read the json data-----Very Important(Otherwise undefined will appear instead of actual json data)used by the server to read JSON payload
app.use(express.json());
//Routes
app.use('/test',TestRouter);
app.use('/home',HomeRouter);
app.use(cookieParser());

app.listen(PORT,()=>{
    console.log(`listening on ${PORT}`);
})