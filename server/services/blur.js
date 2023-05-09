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

const {getOwnerId} = require('./auth')

const getAllListingTasksService = async (userId) => {
    
    userId = await getOwnerId(userId)
    const tasks = await db.blurListingTasks.findAll({
        where: { user_id: userId },
        attributes: [
            'id',
            'collection',
            'webhook',
            'pricelimit',
            'rarity',
            'raritylimit'
        ],
        order: [['createdAt', 'DESC']],
        include: [{
            model: db.users,
            attributes: ['username']
        }]
    });
    
    logger.log('Got BlurListings tasks, returning it...', 1);
    return tasks;
};

const createListingTaskService = async (userId, requestBody) => {
    userId = await getOwnerId(userId);
  
    const { collection, rarity, webhook, pricelimit, raritylimit } = requestBody;
  
    const webhookValue = webhook === '' ? null : webhook;
    const pricelimitValue = pricelimit === '' ? null : pricelimit;
  
    const task = await db.blurListingTasks.create({
      collection,
      webhook: webhookValue,
      rarity,
      pricelimit: pricelimitValue,
      raritylimit,
      user_id: userId,
    });
  
    logger.log('Successfully created BlurListings task', 1);
    return task.id;
  };

const deleteListingTaskService = async (listingId) => {
    await db.blurListingTasks.destroy({
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
