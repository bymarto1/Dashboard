const logger = require('../utils/logger');
const { inspect } = require('util');
const { StatusCodes } = require('http-status-codes');

const {
    getAllListingTasksService,
    createListingTaskService,
    deleteListingTaskService,
} = require('../services/opensea');

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

const getAllFloorTasks = async (req, res, next) => {
    logger.log('Received getAllOSFloorTasks request', 1);
    try {
        const tasks = await getAllFloorTasksService(req.userId, req.body);
        res.status(StatusCodes.OK).json(tasks);
    } catch (error) {
        logger.log(error.message, 0);
        next(error);
    }
};

const createFloorTask = async (req, res, next) => {
    logger.log('Received createOSFloorTask request', 1);
    try {
        const taskId = await createFloorTaskService(req.userId, req.body);
        res.status(StatusCodes.CREATED).json(taskId);
    } catch (error) {
        logger.log(error.message, 0);
        next(error);
    }
};

const deleteFloorTask = async (req, res, next) => {
    logger.log('Received deleteFloorTask request', 1);
    try {
        await deleteFloorTaskService(req.params.id);
        res.status(StatusCodes.NO_CONTENT).send();
    } catch (error) {
        logger.log(error.message, 0);
        next(error);
    }
};

const getAllUserTasks = async (req, res, next) => {
    logger.log('Received getAllOSUserTasks request', 1);
    try {
        const tasks = await getAllUserTasksService(req.userId, req.body);
        res.status(StatusCodes.OK).json(tasks);
    } catch (error) {
        logger.log(error.message, 0);
        next(error);
    }
};

const createUserTask = async (req, res, next) => {
    logger.log('Received createOSUserTask request', 1);
    try {
        const taskId = await createUserTaskService(req.userId, req.body);
        res.status(StatusCodes.CREATED).json(taskId);
    } catch (error) {
        logger.log(error.message, 0);
        next(error);
    }
};

const deleteUserTask = async (req, res, next) => {
    logger.log('Received deleteUserTask request', 1);
    try {
        await deleteUserTaskService(req.params.id);
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
    getAllFloorTasks,
    createFloorTask,
    deleteFloorTask,
    createUserTask,
    getAllUserTasks,
    deleteUserTask,
};
