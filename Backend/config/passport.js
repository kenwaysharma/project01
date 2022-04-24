const User = require("../models/User")
const LocalStrategy = require('passport-local').Strategy;



module.exports = function(passport){
    passport.use(new LocalStrategy(
        function(username, password, done) {
            //Match user
          User.findOne({ username: username },(err, user) =>{
            if (err) { return done(err); }
            if (!user) { return done(null, false); }
            //Match password
            if (!user.verifyPassword(password)) { return done(null, false); }
            return done(null, user);
          });
        }
      ));


      passport.serializeUser((user, done) => {
        done(null, user.id);
      });
    
      passport.deserializeUser((id, done) => {
        // Look up user id in database. 
        User.findById(id,  (err, user)=> {
          if (err) return done(err); 
          done(null, user);
        });
      });
}




