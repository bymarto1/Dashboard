require('dotenv').config();
const { StatusCodes } = require('http-status-codes');
const db = require('../db/connect');
const bcrypt = require('bcrypt');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const logger = require('../utils/logger');
const { inspect } = require('util');
const {
    BadRequestError,
    UnauthenticatedError,
    InternalServerError,
} = require('../errors');

const registerService = async (requestBody) => {
    const { username, password } = requestBody;

    const hash = bcrypt.hashSync(password, 10);

    const user = await db.users.create({
        id: crypto.randomUUID(),
        username,
        hashedPassword: hash,
        role: 'USER',
    });
    var klk = await db.configs.create({ id: crypto.randomUUID(), user_id: user.id });
    logger.log(
        'Successfully registered group, sending response with id and token...',
        1
    );
    return user.id;
};

const registerStaffService = async (requestBody) => {
    const { username, password, user_id } = requestBody;
    
    const userExists = await db.users.findOne({ where: { username: username } });
    if (userExists) {
      throw new Error('Username already in use');
    }
  
    const hash = bcrypt.hashSync(password, 10);
  
    const user = await db.staffs.create({
      id: crypto.randomUUID(),
      username,
      hashedPassword: hash,
      role: 'STAFF',
      UserId: user_id,
    });
  
    logger.log(
      'Successfully registered Staff, sending response with id and token...',
      1
    );
  
    return user.id;
  };
const loginService = async (requestBody) => {
    const { username, password } = requestBody;

    logger.log('Checking if user exists in back-end db...', 1);
    let user = await db.users.findOne({ where: { username: username } });

    if (!user) {
        // If user is not found in the Users table, search in the Staff table
        user = await db.staffs.findOne({ where: { username: username } });
    }

    if (!user) {
        throw new UnauthenticatedError('Invalid username or password');
    }

    logger.log('Checking password...', 1);
    const passwordCorrect = await bcrypt.compare(password, user.hashedPassword);

    if (!passwordCorrect) {
        throw new UnauthenticatedError('Invalid username or password');
    }

    logger.log('Generating token...', 1);
    const userForToken = {
        id: user.id,
        username: user.username,
        role: user.role,
    };
    const token = jwt.sign(userForToken, process.env.SECRET, {
        expiresIn: '1d',
    });

    return { username: user.username, role: user.role, token };
};

const getOwnerId = async (id) => {

    logger.log('Checking userId', 1);
    var user = await db.users.findOne({ where: { id: id } });
    console.log(user)
    if (!user) {
        logger.log('Staff detected', 1);

        // If user is not found in the Users table, search in the Staff table
        user = await db.staffs.findOne({ where: { id: id } });
        return user.id
    }
    return id


};

module.exports = { registerService, loginService , registerStaffService, getOwnerId};
