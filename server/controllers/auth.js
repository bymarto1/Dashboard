const logger = require('../utils/logger');
const { inspect } = require('util');
const { registerService, loginService } = require('../services/auth');
const { StatusCodes } = require('http-status-codes');

const register = async (req, res, next) => {
    logger.log('Received register request', 1);
    try {
        const register = await registerService(req.body);
        res.status(StatusCodes.CREATED).json({
            id: register,
        });
    } catch (error) {
        logger.log(error.message, 0);
        next(error);
    }
};

const login = async (req, res, next) => {
    logger.log('Received login request', 1);
    try {
        const credentials = await loginService(req.body);
        logger.log(`User successfully logged in...`, 1);
        res.status(StatusCodes.OK).json(credentials);
    } catch (error) {
        logger.log(error.message, 0);
        next(error);
    }
};

module.exports = {
    register,
    login,
};
