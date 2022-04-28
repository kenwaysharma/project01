const express = require('express');
const passport = require('passport');
const router = express.Router()
const User = require("../models/User")

const {ensureAuthenticated} = require('../config/auth');
const flash = require('express-flash');
router.get('/',(req,res)=>{
    res.json({msg:"HELLO SIRThe misster!"});
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
                console.log(">> New user Saved Successfully");
                res.json(nUser)          
            })
        }
    })   
}
})
router.get('/success',ensureAuthenticated, function(req, res) {
    //Finding user by the cookie stored ID
    console.log(req.session)
    User.findById(req.session.passport.user)
    .then(user=>{
        const tbs = {
            username: user.username,
            email: user.email,
            user_id:user._id
        }
        res.json(tbs)
    })
});
router.get('/fail', function(req, res) {
    res.json({msg: "Please enter correct email and password"});
});

router.get('/test',ensureAuthenticated, function(req, res) {
    res.json({msg: "Welcome Sir!"});
});

//Login
router.post('/login', (req,res,next)=>{
    const {email, password}=req.body;
    console.log(email," ",password)
    
    passport.authenticate('local', {
        successRedirect : '/users/success',
        failureRedirect: '/users/fail',
        

    },)(req,res,next);
    
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