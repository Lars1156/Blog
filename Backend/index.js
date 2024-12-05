const express = require('express');
const bodyParser = require('body-parser');
const{connection} = require('./connection');
const routerAPI = require('./router/api');
const cros = require('cors');
const app = express();


// database Connection 
connection('mongodb://localhost:27017/blog-system').then(()=>{
    console.log("Database Connection is Sucessfully");
    
}).catch((error)=>{
    console.log("Connection Faild to data base", error);
    
})
// Frontend to Backend Connection Using Cros
crosOption = {
    origin:'http://localhost:3000',
    optionSuccessfulStatus: 200
}

// Middleware
app.use(express.json());
app.use(bodyParser.json());
app.use(cros(crosOption));
app.use('/api', routerAPI)


app.listen(4007 , ()=>{
    console.log("Server is  running on port 4007");
    
})