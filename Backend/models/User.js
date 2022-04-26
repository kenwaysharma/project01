const mongoose = require('mongoose')



const userSchema  = new mongoose.Schema({
    username: String,
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required:true
    },
    createdAt: {
        type: Date,
        default: ()=>Date.now()
    },
    posts:[{
        type: mongoose.SchemaTypes.ObjectId,
        ref: "Post"
    }],
    comments: [{
        type: mongoose.SchemaTypes.ObjectId,
        ref: "Comment"
    }]

})


module.exports = mongoose.model("User", userSchema);