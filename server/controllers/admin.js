const logger = require('../utils/logger');
const { inspect } = require('util');
const { getAllUsersService, deleteUserService } = require('../services/admin');
const { StatusCodes } = require('http-status-codes');

const getAllUsers = async (req, res, next) => {
    logger.log('Received getAllUsers request', 1);
    try {
        const users = await getAllUsersService();
        res.status(StatusCodes.OK).json(users);
    } catch (error) {
        logger.log(error.message, 0);
        next(error);
    }
};

const deleteUser = async (req, res, next) => {
    logger.log('Received deleteUser request', 1);
    try {
        await deleteUserService(req.params.id);
        res.status(StatusCodes.NO_CONTENT).send();
    } catch (error) {
        logger.log(error.message, 0);
        next(error);
    }
};

module.exports = {
    getAllUsers,
    deleteUser,
};
