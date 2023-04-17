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

db.configs = require('./models/Config')(sequelize, Sequelize);
db.blurListingTasks = require('./models/BlurListing')(sequelize, Sequelize);


// Sync with the db
sequelize
    .sync({ force: false })
    .then(() => logger.log('DB successfully synchronized', 1));

module.exports = db;
   