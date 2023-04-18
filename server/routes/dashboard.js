// initialize
const express = require('express');
const router = express.Router();

// controller
const {
    updateConfig,
    getCurrentConfig,
    getDashboardInfo,
    payRenewal,

} = require('../controllers/dashboard');

router.route('/').get(getDashboardInfo);

router.route('/config').get(getCurrentConfig).put(updateConfig);

router.route('/payment').post(payRenewal);

module.exports = router;
