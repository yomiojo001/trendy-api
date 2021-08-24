const express = require('express');
const { createPost, getPosts, postByUser, postById, isPoster, updatePost, deletePost } = require('../controllers/post');
const { requireSignin} = require('../controllers/auth');
const {createPostValidator} = require('../validator')
const { userById } = require("../controllers/user");
const router = express.Router();

router.get('/posts', getPosts);
router.post('/post/new/:userId', requireSignin, createPost, createPostValidator());
router.get('/posts/by/:userId',  requireSignin, postByUser);
router.put('/post/:postId', requireSignin, isPoster, updatePost)
router.delete('/post/:postId', requireSignin, isPoster, deletePost)

// any routes containing :userId , our app will first excecute userbyid()
router.param("userId", userById);

// any routes containing :postId , our app will first excecute postById()
router.param("postId", postById);

module.exports = router;