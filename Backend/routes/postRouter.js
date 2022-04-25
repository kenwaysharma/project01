const express = require('express');


const router = express.Router()
const User = require("../models/User")
const Post = require("../models/Post");
const { ensureAuthenticated } = require('../config/auth');




//get all posts
router.get('/', (req,res)=>{
Post.find({})
.then(posts=>{
    res.json(posts)
})
})

//create new post
router.post('/create', ensureAuthenticated,async (req,res)=>{
    const user = await User.findById(req.session.passport.user)

    const {title, body, category} = req.body;
    const nPost = new Post({
        title,
        body,
        category,
        by: req.session.passport.user,
    })
    console.log(nPost)
    await nPost.save().then( async post=>{
        user.posts.push(post)
        await user.save()
        console.log(user);
        res.json(post)
    })


})

//Create new comment



module.exports = router;