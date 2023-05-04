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
const { Sequelize, Op } = require('sequelize');

const {getOwnerId} = require('./auth')

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
  const getPerformanceService = async (userId) => {
    userId = await getOwnerId(userId);
  
    const user = await db.users.findOne({
      where: { id: userId },
      include: [
        {
          model: db.blurListingTasks,
        },
      ],
    });
  
    const currentTime = new Date();
    const oneHourAgo = new Date(currentTime.getTime() - 60 * 60 * 1000);
    const oneDayAgo = new Date(currentTime.getTime() - 24 * 60 * 60 * 1000); 
  
    const info = {
      collections: await Promise.all(
        user.BlurListings.map(async (collection) => {
          const histories = await db.collectionsMonitoringHistory.findAll({
            where: {
              blurlistings_id: collection.id,
              timestamp: {
                [Op.gte]: oneHourAgo,
                [Op.lt]: oneDayAgo, 
              },
            },
          });
  
          return {
            id: collection.id,
            collection: collection.collection,
            performance: histories.map((history) => {
              return {
                timestamp: history.timestamp,
                total_requests: history.total_requests,
                successful_requests: history.successful_requests,
              };
            }),
          };
        })
      ),
    };
  
    return info;
  };
  
  const saveMonitoringDataService = async (collection, total_requests, successful_requests) => {
    try {
      const result = await db.collectionsMonitoringHistory.create({
        id: crypto.randomUUID(),
        blurlistings_id: collection,
        timestamp: new Date(),
        total_requests,
        successful_requests,
      });
  
      console.log('Monitoring data saved successfully:', result);
    } catch (error) {
      console.error('Error saving monitoring data:', error);
    }
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
    getPerformanceService,
    payRenewalService,
    saveMonitoringDataService,
};
