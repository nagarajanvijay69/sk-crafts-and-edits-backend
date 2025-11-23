const express = require('express');
const cors = require('cors');
require('dotenv').config();
const router = require('./routers/router');
const mongoose = require('mongoose');


const app = express();
app.use(express.json());


app.use(cors({
      origin : ['http://localhost:3000'],
      methods : ['POST', 'PUT', 'DELETE', 'GET', 'PATCH']
}));


app.use('/', router);


try{
  mongoose.connect((`${process.env.MONGODB_URL}`));
  console.log("DB connected successfully");
}catch(e){
  console.log("DB connected unsuccessfully \nError : ", e.message);
}

app.listen(process.env.PORT, ()=>{
     console.log("Server running on the port 8000");
});
