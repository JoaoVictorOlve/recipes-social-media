const express = require('express');
const router = express.Router();
const userController = require('../controller/userController');

router.get('/', userController.getUser);

router.post('/login', userController.loginUser);

router.post('/create', userController.createUser);

module.exports = router;
