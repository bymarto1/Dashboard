require('dotenv').config();
const { StatusCodes } = require('http-status-codes');
const db = require('../db/connect');
const logger = require('../utils/logger');
const crypto = require('crypto');
const { inspect } = require('util');
const {
    BadRequestError,
    UnauthenticatedError,
    InternalServerError,
    NotFoundError,
} = require('../errors');

const getAllListingTasksService = async (userId) => {
    const tasks = await db.BlurListingTasks.findAll({
        where: { user_id: userId },
        attributes: [
            'id',
            'address',
            'webhook',
            'pricelimit',
        ],
        order: [['createdAt', 'DESC']],
        include: [{
            model: db.Users,
            attributes: ['username']
        }]
    });
    logger.log('Got BlurListings tasks, returning it...', 1);
    return tasks;
};

const createListingTaskService = async (userId, requestBody) => {
    const { address, webhook, pricelimit } = requestBody;

    const task = await db.BlurListingTasks.create({
        address,
        webhook,
        pricelimit,
        user_id: userId,
    });
    logger.log('Successfully created BlurListings task', 1);
    return task.id;
};

const deleteListingTaskService = async (listingId) => {
    await db.BlurListingTasks.destroy({
        where: {
            id: listingId,
        },
    });
    logger.log(`Successfully deleted BlurListings task with id ${listingId}`, 1);
    return;
};

module.exports = {
    getAllListingTasksService,
    createListingTaskService,
    deleteListingTaskService,

};
