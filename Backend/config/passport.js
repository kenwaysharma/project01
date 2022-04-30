const User = require("../models/User")
const LocalStrategy = require('passport-local').Strategy;
module.exports = function(passport){
    passport.use(new LocalStrategy({usernameField: 'email'},(email, password, done)=>{
      User.findOne({email: email})
      .then(user=>{
        if(!user){
          return done(null,false, {msg: 'Email is not registered'})
        }
        if(user.password==password){
          return done(null, user)
        }else{
          return done(null,false,{msg: "Password Incorrect"})
        }
      })
    }
      ));
      passport.serializeUser((user, done) => {
        done(null, user._id );
      });
      passport.deserializeUser((id, done) => {
        // Look up user id in database. 
        User.findById(id,  (err, user)=> {
          if (err) return done(err); 
          done(null, user);
        });
      });
}
