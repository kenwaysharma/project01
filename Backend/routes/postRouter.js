const express = require('express');


const router = express.Router()
const User = require("../models/User")
const Post = require("../models/Post");
const Comment = require("../models/Comment");
const { ensureAuthenticated } = require('../config/auth');
const { create } = require('../models/User');




//get all posts
router.get('/', (req,res)=>{
Post.find({})
.populate("by")
.then(posts=>{

    res.json(posts)
    console.log(posts)
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

router.get('/single/:id', async (req,res)=>{
    const id = req.params.id;
    console.log(id)
    Post.findById(id)
    .populate({
        path: 'comments',
        model: 'Comment',
        populate: [{
            path: 'by',
            model: 'User',
            select: {'username':1},
        }]
    }).populate("by", "-password -email -posts")
    .then((post=>{
        res.json(post)
    })).catch(e=>{
        if(e.name=="CastError"){
            res.json({msg:"Post not found"})
        }
    })
    
})

//Create new comment
router.post('/create/comment/:id',ensureAuthenticated,async(req,res)=>{
    //Get Comment, User and Post to create new comment and 
    //add it to the post and the user the comment was made by.
    const post_id = req.params.id;
    const user = await User.findById(req.session.passport.user);
    //Create new comment
    const nComment = new Comment({
        body: "This is the comment",
        by: req.session.passport.user
    })
    //Save new comment    
    nComment.save().then(async comment =>{
        //Find the post in which to put the comment
        Post.findById(post_id)
        .then(async post=>{
            console.log(post);
        //Push the comment to the post
        post.comments.push(comment)
        await post.save();
        console.log("saved comment to post")
        //Push the comment to user profile
        user.comments.push(comment)
        await user.save();
        console.log("saved comment to user")
        })
    })
    


})


module.exports = router;