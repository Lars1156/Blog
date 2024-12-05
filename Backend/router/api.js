const express = require('express');
const router = express.Router();
const userController = require('../controller/userController');
const blogController = require('../controller/blogController');
const authenticate = require('../middleware/auth');
// user api 

router.post('/register' , userController.registerUser);
router.post('/login' , userController.loginUser);
router.get('/getall' , userController.getAllUser);

// blog API 
router.post ('/createblog' , authenticate, blogController.createBlog);
router.post('/:blogId/like', authenticate, blogController.likeBlogs);
router.post('/:blogId/commit' , authenticate , blogController.addComment);
router.put('/:blogId', authenticate , blogController.upadteBlog);
router.delete('/:blogId' , authenticate , blogController.deleteBlog );
router.get('/getBlog' , authenticate , blogController.getAllBlog);
router.get('/getAllBlog' , blogController.getAllBlogAuther);

module.exports = router;