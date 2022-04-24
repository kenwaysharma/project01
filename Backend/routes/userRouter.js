const express = require('express');
const passport = require('passport');
const router = express.Router()
const User = require("../models/User")
const {ensureAuthenticated} = require('../config/auth')
router.get('/',(req,res)=>{
    res.send("HELLO SIR!");
})

//Register or Create new user
router.post('/register',(req,res)=>{
    const {username,email,password,passwordConfirm } = req.body;

let errors = [];

//Check required field
if(!username || !email || !password){
    errors.push({msg: 'Please fill all the fields'})
}

//Check if Passwords match
if(password!=passwordConfirm){
    errors.push({msg: "Passwords do not match"})
}

//Check pass Length
if(password.length<3){
    errors.push({msg: "Password requires minimum 3 characters"})
}

if(errors.length>0){
    res.json(errors);
}else{
    //Check if user exists
    User.findOne({email: email})
    .then(user=>{
        if(user){
            errors.push({msg: 'Email already registered'});
            res.json(errors);
        }else{
            //If user does not exist then create new user
            const nUser = new User({
                username,
                email,
                password
            })
            //Save user to Db
            nUser.save().then(()=>{
                console.log(">>Saved Successfully");
                res.json(nUser)          
            })
        }
    })   
}
})
router.get('/success',ensureAuthenticated, function(req, res) {
    res.json({msg: "Successfully logged in"});
});
router.get('/fail',ensureAuthenticated, function(req, res) {
    res.json({msg: "Failed to login"});
});

router.get('/test',ensureAuthenticated, function(req, res) {
    res.json({msg: "Dashboard"});
});

//Login
router.post('/login', (req,res,next)=>{
    const {email, password}=req.body;
    passport.authenticate('local', {
        successRedirect : '/users/success',
        failureRedirect: '/users/fail'

    })(req,res,next);
    

    //Check user
    //User.findOne({email: email})
    //.then(user=>{
    //    //Check if user exists
    //    if(user){
    //        //Check if user password matches
    //        if(password!=user.password){
    //            res.json({msg: "Incorrect password"})
    //        }else{
    //            res.json({msg: "Success", user})
    //            console.log(">>Login Succesful")
    //        }
    //    }else{
    //        //If user does not exist
    //        res.json({msg: "Email does not exist"})
    //    }
    //    
    //})


})



router.get('/logout', (req,res)=>{
    
    req.logout();

    res.status(200).clearCookie('connect.sid', {
        path: '/'
      });
      req.session.destroy();
    res.json("logged Out!")
    
} )




module.exports = router;