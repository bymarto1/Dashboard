const logger = require('../utils/logger');
const { inspect } = require('util');
const {
    updateConfigService,
    getCurrentConfigService,
    getDashboardInfoService,
    getPaymentInfoService,
    payRenewalService
} = require('../services/dashboard');
const { StatusCodes } = require('http-status-codes');

const updateConfig = async (req, res, next) => {
    logger.log('Received updateConfig request', 1);
    try {
        await updateConfigService(req.userId, req.body);
        res.status(StatusCodes.OK).send();
    } catch (error) {
        logger.log(error.message, 0);
        next(error);
    }
};

const getCurrentConfig = async (req, res, next) => {
    logger.log('Received getCurrentConfig request', 1);
    try {
        const config = await getCurrentConfigService(req.userId);
        res.status(StatusCodes.OK).json(config);
    } catch (error) {
        logger.log(error.message, 0);
        next(error);
    }
};

const getDashboardInfo = async (req, res, next) => {
    logger.log('Received getDashboardInfo request', 1);
    try {
        const info = await getDashboardInfoService(req.userId);
        res.status(StatusCodes.OK).json(info);
    } catch (error) {
        logger.log(error.message, 0);
        next(error);
    }
};

const getPaymentInfo = async (req, res, next) => {
    logger.log('Received getPaymentInfo request', 1);
    try {
        const info = await getPaymentInfoService(req.userId);
        res.status(StatusCodes.OK).json(info);
    } catch (error) {
        logger.log(error.message, 0);
        next(error);
    }
};
const payRenewal = async (req, res, next) => {
    logger.log('Received payRenewal request', 1);
    try {
        const { transactionHash , price } = req.body;
        const response = await payRenewalService(req.userId, transactionHash, price);
        res.status(StatusCodes.OK).json(response);
    } catch (error) {
        logger.log(error.message, 0);
        next(error);
    }
};


module.exports = {
    updateConfig,
    getCurrentConfig,  
    getPaymentInfo,  
    getDashboardInfo,
    payRenewal,
};
