const express = require('express');
const app = express();
const port = process.env.PORT || 5000;
require("dotenv").config();
const mongoDB = require("./db");
mongoDB();
const cors = require('cors');
app.use(cors());

 const BASE_URL = process.env.BASE_URL;

// //CORS including to avoid error
app.use((req,res,next)=>{
  res.setHeader("Access-Control-Allow-Origin",BASE_URL);
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accespt"
  );
  next();
})


app.use(
  express.urlencoded({ extended: true })
);

app.use(express.json());
app.use('/api', require('./Routes/CreateUser'));
app.use('/api',require('./Routes/DisplayData'));
app.use('/api',require('./Routes/OrderData'));
app.get('/', (req,res)=>{
  res.send('Hello World! ..........');
})
app.listen(port, ()=> {
    console.log(`Example app listening on port ${port}`)
})

