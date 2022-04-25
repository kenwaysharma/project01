module.exports = {
    ensureAuthenticated: function(req,res,next){
       
        if(req.isAuthenticated()){
            return next();
        }else{
            res.json("User not authenticated")
        }
    }
}