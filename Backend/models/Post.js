const mongoose  = require("mongoose")
const postSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    body:{
        type:String,
        required: true
    },
    createdAt: {
        type: Date,
        default: ()=>Date.now()
    },
    by: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "User"
    },
    comments: [{
        type: mongoose.SchemaTypes.ObjectId,
        ref: "Comment"
    }]
})
module.exports = mongoose.model("Post", postSchema);