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
router.post('/blogs/:blogId/like', authenticate, blogController.likeBlogs)

module.exports = router;