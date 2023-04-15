// initialize
const express = require('express');
const router = express.Router();

// controller
const {
    updateConfig,
    getCurrentConfig,

} = require('../controllers/dashboard');

router.route('/config').get(getCurrentConfig).put(updateConfig);


module.exports = router;
