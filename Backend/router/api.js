const express = require('express');
const router = express.Router();
const userController = require('../controller/userController');

// user api 

router.post('/register' , userController.registerUser);
router.post('/login' , userController.loginUser);
router.get('/getall' , userController.getAllUser);

module.exports = router;