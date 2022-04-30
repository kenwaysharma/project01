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
console.log(username,email,password,passwordConfirm )


//Check if Passwords match
if(password!=passwordConfirm){
    res.json("Password do not match")
}else{
    //Check if user exists
    User.findOne({email: email})
    .then(user=>{
        if(user){
            res.json("Email already registered")
            
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
                   res.json("Registered")       
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
    res.json("Success")
    
} )




module.exports = router;