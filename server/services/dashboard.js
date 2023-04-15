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
    const { webhookName, generalWebhook, generalDelay, image } = requestBody;
    const config = await db.configs.findOne({ where: { UserId: userId } });

    await config.update({ webhookName, generalWebhook, generalDelay });
    logger.log('Successfully updated general config', 1);
    return;
};

const getCurrentConfigService = async (userId) => {
    const config = await db.configs.findOne({ where: { UserId: userId } });
    logger.log('Got current general config, returning it...', 1);
    return config;
};



module.exports = {
    updateConfigService,
    getCurrentConfigService,
};
