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

const loginService = async (requestBody) => {
    const { username, password } = requestBody;

    logger.log('Checking if user exists in back-end db...', 1);
    const user = await db.users.findOne({ where: { username: username } });
    logger.log('Checking password...', 1);
    const passwordCorrect =
        user === null
            ? false
            : await bcrypt.compare(password, user.hashedPassword);

    if (!(user && passwordCorrect))
        throw new UnauthenticatedError('Invalid username or password');

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

module.exports = { registerService, loginService };
