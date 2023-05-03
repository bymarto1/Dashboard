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

const getDashboardInfoService = async (userId) => {
  var user = await db.users.findOne({
    where: { id: userId },
    include: { model: db.renewals },
  });
  var owner = user.username
  if (!user) {
    user = await db.staffs.findOne({
      where: { id: userId },
      include: { model: db.renewals },
    });
    var owner = user.UserId.username
  }
  console.log(owner)
  const taskCount = await db.blurListingTasks.count({
    where: { user_id: userId },
  });

  const staffs = await db.staffs.findAll({
    where: { UserId: userId },
  });

  const staffUsernames = staffs.map((staff) => staff.username);

  const info = {
    username: user.username,
    memberSince: user.createdAt,
    expiryDate: user.Renewal.expiryDate,
    blurTaskCount: taskCount,
    teamCount: staffUsernames.length + 1,
    staffs: staffUsernames,
    owner : owner
  };
  return info;
};

  const getPaymentInfoService = async (userId) => {
    var user = await db.users.findOne({
      where: { id: userId },
      include: { model: db.renewals },
    });

    const info = {
      memberSince: user.createdAt,
      expiryDate: user.Renewal.expiryDate,
    };
    return info;
  };
  
  
  const payRenewalService = async (userId, transactionHash, price) => {
    const [renewal, created] = await db.renewals.findOrCreate({
        where: { UserId: userId },
        defaults: {
            id: crypto.randomUUID(),
            expiryDate: new Date().setMonth(new Date().getMonth() + 1),
        },
        UserId: userId
    });

    console.log(renewal, created)

    if (!created) {
        const now = new Date();
        const expiry = new Date(renewal.expiryDate);
        const diffInDays = Math.floor((now - expiry) / (1000 * 60 * 60 * 24));
        let daysToAdd = diffInDays;
        if (daysToAdd > 10) {
            daysToAdd = 10;
        }
        const newExpiry = new Date(now.getTime() - daysToAdd * (1000 * 60 * 60 * 24));
        newExpiry.setMonth(newExpiry.getMonth() + 1);
        await renewal.update({ expiryDate: newExpiry });
        logger.log('Successfully updated user renewal date', 1);
    }

    const payment = await db.payments.create({
        id: crypto.randomUUID(),
        transactionHash : transactionHash,
        price : price,
        UserId: userId,
    });
    return;
};


module.exports = {
    updateConfigService,
    getCurrentConfigService,    
    getDashboardInfoService,
    getPaymentInfoService,
    payRenewalService,
};
