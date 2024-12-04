const express = require('express');
const router = express.Router();
const userController = require('../controller/userController');
const authenticate = require('../middleware/authenticate');
// user api 

router.post('/register' , userController.registerUser);
router.post('/login' , userController.loginUser);
router.get('/getall' , userController.getAllUser);

module.exports = router;