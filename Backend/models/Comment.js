const mongoose  = require('mongoose');

const commentSchema = new mongoose.Schema({
    body:{
        type: String,
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
})

module.exports = mongoose.model("Comment", commentSchema);