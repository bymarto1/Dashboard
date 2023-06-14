const express = require('express');
const router = express.Router();
const rateLimiter = require('express-rate-limit');

const limiterOptions = {
  windowMs: 15 * 60 * 1000, 
  max: 100, 
};

const rateLimiterMiddleware = rateLimiter(limiterOptions);

const nonRateLimitedEndpoints = ['/performance', '/performance/save'];

router.use((req, res, next) => {
  if (nonRateLimitedEndpoints.includes(req.path)) {
    next();
  } else {
    rateLimiterMiddleware(req, res, next);
  }
});

// controller
const {
  updateConfig,
  getCurrentConfig,
  getDashboardInfo,
  getPaymentInfo,
  payRenewal,
  saveMonitoringData,
  getPerformance,
} = require('../controllers/dashboard');

router.route('/').get(getDashboardInfo);

router.route('/performance').get(getPerformance).post(saveMonitoringData);

router.route('/config').get(getCurrentConfig).put(updateConfig);

router.route('/payment').get(getPaymentInfo).post(payRenewal);

module.exports = router;
