const express = require('express');
const bodyParser = require('body-parser');
const{connection} = require('./connection');
const routerAPI = express.Router();
const app = express();


// database Connection 
connection('mongodb://localhost:27017/blog-System').then(()=>{
    console.log("Database Connection is Sucessfully");
    
}).catch((error)=>{
    console.log("Connection Faild to data base", error);
    
})
// Middleware
app.use(express.json());
app.use(bodyParser.json());
app.use('/api', routerAPI)
app.listen(4007 , ()=>{
    console.log("Server is  running on port 4007");
    
})