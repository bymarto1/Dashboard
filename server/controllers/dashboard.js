const logger = require('../utils/logger');
const { inspect } = require('util');
const {
    updateConfigService,
    getCurrentConfigService,
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




module.exports = {
    updateConfig,
    getCurrentConfig,
};
