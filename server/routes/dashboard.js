// initialize
const express = require('express');
const router = express.Router();

// controller
const {
    updateConfig,
    getCurrentConfig,
    getDashboardInfo,
    getPaymentInfo,
    payRenewal,

} = require('../controllers/dashboard');

router.route('/').get(getDashboardInfo);

router.route('/config').get(getCurrentConfig).put(updateConfig);

router.route('/payment').get(getPaymentInfo).post(payRenewal);

module.exports = router;
