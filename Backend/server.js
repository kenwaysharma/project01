require("dotenv").config()
const app = require('./app')
const port = process.env.PORT
const mongoose = require('mongoose');
const uri = process.env.mongoATLAS;
mongoose.connect(uri, ()=>{
    console.log("Database Connect...")
},e=>console.log(e));
const server  = app.listen(port, () => console.log(`Example app listening on port ${port}!`)) 