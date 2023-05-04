require('dotenv').config(); // load the environment variables from the .env file


const { Sequelize, Op } = require('sequelize');

const logger = require('../utils/logger');
const sequelize = new Sequelize({
    dialect: 'postgres',
    host: process.env.DB_HOST,
    port: 5432, // the default port for PostgreSQL is 5432
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    ssl: true, 
    // set to true if you're using SSL/TLS
  });
// Connect all the models/tables in the database to a db object

  
const db = {};



// Models / tables
db.users = require('./models/User')(sequelize, Sequelize);

db.configs = require('./models/Config')(sequelize, Sequelize);
db.blurListingTasks = require('./models/BlurListing')(sequelize, Sequelize);
db.payments = require('./models/Payment')(sequelize, Sequelize);
db.renewals = require('./models/Renewal')(sequelize, Sequelize);
db.staffs = require('./models/Staff')(sequelize, Sequelize);
db.collectionsMonitoringHistory = require('./models/CollectionsMonitoringHistory')(sequelize, Sequelize)
// Relations
db.users.hasOne(db.configs, { foreignKey: 'user_id' });
db.configs.belongsTo(db.users, { foreignKey: 'user_id' });

db.users.hasMany(db.blurListingTasks, { foreignKey: 'user_id' });
db.blurListingTasks.belongsTo(db.users, { foreignKey: 'user_id' });

db.blurListingTasks.hasMany(db.collectionsMonitoringHistory, { foreignKey: 'id' });
db.collectionsMonitoringHistory.belongsTo(db.blurListingTasks, { foreignKey: 'id' });

db.users.hasMany(db.payments);
db.payments.belongsTo(db.users);

db.users.hasOne(db.renewals);
db.renewals.belongsTo(db.users);

db.users.hasMany(db.staffs);
db.staffs.belongsTo(db.users);
// Sync with the db
sequelize
    .sync({ force: false })
    .then(() => logger.log('DB successfully synchronized', 1));

module.exports = db;
   