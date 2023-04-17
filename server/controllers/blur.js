const logger = require('../utils/logger');
const { inspect } = require('util');
const { StatusCodes } = require('http-status-codes');

const {
    getAllListingTasksService,
    createListingTaskService,
    deleteListingTaskService,
} = require('../services/blur');

const getAllListingTasks = async (req, res, next) => {
    logger.log('Received getAllOSListingTasks request', 1);
    try {
        const tasks = await getAllListingTasksService(req.userId);
        res.status(StatusCodes.OK).json(tasks);
    } catch (error) {
        logger.log(error.message, 0);
        next(error);
    }
};

const createListingTask = async (req, res, next) => {
    logger.log('Received createOSListingTask request', 1);
    try {
        const taskId = await createListingTaskService(req.userId, req.body);
        res.status(StatusCodes.CREATED).json(taskId);
    } catch (error) {
        logger.log(error.message, 0);
        next(error);
    }
};

const deleteListingTask = async (req, res, next) => {
    logger.log('Received deleteListingTask request', 1);
    try {
        await deleteListingTaskService(req.params.id);
        res.status(StatusCodes.NO_CONTENT).send();
    } catch (error) {
        logger.log(error.message, 0);
        next(error);
    }
};




module.exports = {
    createListingTask,
    getAllListingTasks,
    deleteListingTask,
};
