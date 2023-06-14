const express = require('express');
const router = express.Router();
const rateLimiter = require('express-rate-limit');

const limiterOptions = {
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 15, // Maximum 10 requests per windowMs
};

const rateLimiterMiddleware = rateLimiter(limiterOptions);

// controller
const { login, register } = require('../controllers/auth');

router.route('/login').post(rateLimiterMiddleware, login);
router.route('/signup').post(register);

module.exports = router;
