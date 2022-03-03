const express = require('express') // exprss framework
const app = express();
require('dotenv').config(); //necessary for reading the env file

const TestRouter = require('./routes/test') // importing routes for test
const HomeRouter = require('./routes/home')  // importing routes for home
// const database = require('./Database/Connection')
const PORT = process.env.PORT; //Getting port number from the env file

//database connection
require('./Database/Connection');

// to read the json data-----Very Important(Otherwise undefined will appear instead of actual json data)used by the server to read JSON payload
app.use(express.json());
//Routes
app.use('/test',TestRouter);
app.use('/home',HomeRouter);

app.listen(PORT,()=>{
    console.log(`listening on ${PORT}`);
})