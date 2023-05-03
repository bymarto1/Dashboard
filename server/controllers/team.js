const logger = require('../utils/logger');
const { inspect } = require('util');
const { StatusCodes } = require('http-status-codes');

const {
    getAllStaffTaskService,
    createStaffTaskService,
    deleteStaffTaskService,
} = require('../services/team');

const getAllStaffTasks = async (req, res, next) => {
    logger.log('Received getAllStaffTasks request', 1);
    try {
        const tasks = await getAllStaffTaskService(req.userId);
        res.status(StatusCodes.OK).json(tasks);
    } catch (error) {
        logger.log(error.message, 0);
        next(error);
    }
};

const createStaffTask = async (req, res, next) => {
    logger.log('Received createStaffTask request', 1);
    console.log(req.body);
    try {
      const  password  = await createStaffTaskService(req.userId, req.body);
      res.status(StatusCodes.CREATED).json(  {password : password });
    } catch (error) {
      logger.log(error.message, 0);
      next(error);
    }
  };

const deleteStaffTask = async (req, res, next) => {
    logger.log('Received deleteStaffTask request', 1);
    try {
        await deleteStaffTaskService(req.params.id);
        res.status(StatusCodes.NO_CONTENT).send();
    } catch (error) {
        logger.log(error.message, 0);
        next(error); 
    }
};




module.exports = {
    getAllStaffTasks,
    createStaffTask,
    deleteStaffTask,
};
