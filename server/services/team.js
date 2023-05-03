require('dotenv').config();
const { StatusCodes } = require('http-status-codes');
const db = require('../db/connect');
const bcrypt = require('bcrypt');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const logger = require('../utils/logger');
const { inspect } = require('util');
const {getOwnerId} = require('./auth')
require('dotenv').config();
const {
    BadRequestError,
    UnauthenticatedError,
    InternalServerError,
} = require('../errors');

const getAllStaffTaskService = async (userId) => {
    
    userId = await getOwnerId(userId)
    const staffs = await db.staffs.findAll({
        where: { UserId: userId },
        attributes: [
            'id',
            'username',
            'discord',
            'createdAt'
        ],
        order: [['createdAt', 'DESC']],
        include: [{
            model: db.users,
            attributes: ['username']
        }]
    });
    
    logger.log('Got Staffs, returning it...', 1);
    return staffs;
};

const createStaffTaskService = async (user_id, requestBody) => {
    const { username, discord } = requestBody;
  
    const userExists = await db.users.findOne({ where: { username: username } });
    if (userExists) {
      throw new Error('Username already in use');
    }
  
    const randomPassword = crypto.randomBytes(8).toString('hex');
    const hash = bcrypt.hashSync(randomPassword, 10);
  
    const user = await db.staffs.create({
      id: crypto.randomUUID(),
      username,
      hashedPassword: hash,
      discord: discord,
      role: 'STAFF',
      UserId: user_id,
    });
  
    logger.log(
      'Successfully registered Staff, sending response with id and password...',
      1
    );
    console.log(randomPassword)
    return  randomPassword;
  };

  const deleteStaffTaskService = async (staffId) => {
    await db.staffs.destroy({
        where: {
            id: staffId,
        },
    });
    logger.log(`Successfully deleted Staff task with id ${staffId}`, 1);
    return;
};
module.exports = { getAllStaffTaskService,createStaffTaskService, deleteStaffTaskService };
