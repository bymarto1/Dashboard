require('dotenv').config(); // load the environment variables from the .env file



const { Sequelize } = require('sequelize');
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
/*
db.configs = require('./models/Config')(sequelize, Sequelize);
db.openseaListingTasks = require('./models/OSListing')(sequelize, Sequelize);
db.openseaFloorTasks = require('./models/OSFloor')(sequelize, Sequelize);
db.openseaUserTasks = require('./models/OSUser')(sequelize, Sequelize);

db.payments = require('./models/Payment')(sequelize, Sequelize);
db.renewals = require('./models/Renewal')(sequelize, Sequelize);

// Relations
db.users.hasOne(db.configs);
db.configs.belongsTo(db.users);

db.users.hasMany(db.openseaListingTasks);
db.openseaListingTasks.belongsTo(db.users);

db.users.hasMany(db.openseaFloorTasks);
db.openseaFloorTasks.belongsTo(db.users);

db.users.hasMany(db.openseaUserTasks);
db.openseaUserTasks.belongsTo(db.users);


db.users.hasMany(db.payments);
db.payments.belongsTo(db.users);

db.users.hasOne(db.renewals);
db.renewals.belongsTo(db.users);
*/
// Sync with the db
sequelize
    .sync({ force: false })
    .then(() => logger.log('DB successfully synchronized', 1));

module.exports = db;
 