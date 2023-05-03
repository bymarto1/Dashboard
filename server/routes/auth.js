// initialize
const express = require('express');
const router = express.Router();

// controller
const { login, register } = require('../controllers/auth');

router.route('/login').post(login);
router.route('/signup').post(register);

module.exports = router;
