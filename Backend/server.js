const app = require('./app')
const port = process.env.PORT || 3000
const mongoose = require('mongoose');

mongoose.connect("mongodb+srv://kenwaysharma:hellobro12@stablxdemocluster.zh3bt.mongodb.net/BlogDB?retryWrites=true&w=majority", ()=>{
    console.log("Database Connect...")
},e=>console.log(e));


const server  = app.listen(port, () => console.log(`Example app listening on port ${port}!`)) 