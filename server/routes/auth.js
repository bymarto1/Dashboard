// initialize
const express = require('express');
const router = express.Router();

// controller
const { login, register, registerStaff } = require('../controllers/auth');

router.route('/login').post(login);
router.route('/signup').post(register);
router.route('/signupStaff').post(registerStaff);

module.exports = router;
