const router = require('express').Router();
const Comment = require('../models/Comment');
const Post = require('../models/Post');


//create a new comment  on a post
router.post('/',async(req,res)=>{
    try {
       const post = await Post.findById(req.body.post);
       const commentRes = await Comment.create(req.body)
        post?.comments.push(commentRes._id);
        post.save();
        res.status(201).json(commentRes)
    }
    catch (err) {
        res.status(500).json(err)
    }
})




module.exports = router;
//delete a comment on a post
router.delete('/:commentId', async(req,res)=>{
    try {
        const commentId = req.params.commentId;
        const commnetDeleteResp=await Comment.findByIdAndDelete({_id:commentId});
        res.status(201).json(commnetDeleteResp);
     }
     catch (err) {
         res.status(500).json(err)
     }
})