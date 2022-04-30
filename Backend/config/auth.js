module.exports = {
    ensureAuthenticated: function(req,res,next){
        console.log(req.isAuthenticated());
        if(req.isAuthenticated()){
            return next();
        }else{
            res.json("User not authenticated")
        }
    }
}