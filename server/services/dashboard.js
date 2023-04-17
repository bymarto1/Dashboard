require('dotenv').config();
const { StatusCodes } = require('http-status-codes');
const db = require('../db/connect');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const logger = require('../utils/logger');
const { inspect } = require('util');
const {
    BadRequestError,
    UnauthenticatedError,
    InternalServerError,
} = require('../errors');

const updateConfigService = async (userId, requestBody) => {
    const { groupName, generalWebhook, generalDelay, groupImage } = requestBody;
    const config = await db.configs.findOne({ where: { user_id: userId } });
    klk = await config.update({ groupName, generalWebhook, generalDelay , groupImage });
    logger.log('Successfully updated general config', 1);
    return;
};

const getCurrentConfigService = async (userId) => {
    console.log('klk')
    const config = await db.configs.findOne({ where: { user_id: userId } });
    logger.log('Got current general config, returning it...', 1);
    return config;
};



module.exports = {
    updateConfigService,
    getCurrentConfigService,
};
