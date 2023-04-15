const jwt = require('jsonwebtoken');
const {
    UnauthenticatedError,
    NotFoundError,
    ForbidenError,
} = require('../errors');
const logger = require('../utils/logger');
const db = require('../db/connect');
require('dotenv').config();

const authenticateUser = async (req, res, next) => {
    logger.log('Starting authenticateUser...', 1);
    const authorization = req.get('authorization');
 
    try {
        if (
            !authorization ||
            !authorization.toLowerCase().startsWith('bearer')
        ) {
            throw new UnauthenticatedError('Authentication invalid');
        }
        let token = authorization.split(' ')[1];
        const decodedToken = jwt.verify(token, process.env.SECRET);

        if (!token || !decodedToken.id) {
            throw new UnauthenticatedError('Token missing or invalid');
        }
        const { id: userId } = decodedToken;

        const user = await db.users.findOne({ where: { id: userId } });
        if (!user) throw new NotFoundError('User does not exist');

        req.userId = userId;

        next();
    } catch (error) {
        logger.log(error.message, 0);
        next(error);
    }
};

const authenticateAdmin = async (req, res, next) => {
    logger.log('Starting authenticateAdmin...', 1);
    const authorization = req.get('authorization');
    try {
        if (
            !authorization ||
            !authorization.toLowerCase().startsWith('bearer')
        ) {
            throw new UnauthenticatedError('Authentication invalid');
        }
        let token = authorization.split(' ')[1];
        const decodedToken = jwt.verify(token, process.env.SECRET);

        if (!token || !decodedToken.id) {
            throw new UnauthenticatedError('Token missing or invalid');
        }
        const { id: userId } = decodedToken;

        const user = await db.users.findOne({ where: { id: userId } });
        if (!user || user.role !== 'ADMIN')
            throw new ForbidenError('Forbidden Access');

        req.userId = userId;

        next();
    } catch (error) {
        logger.log(error.message, 0);
        next(error);
    }
};

module.exports = { authenticateUser, authenticateAdmin };
