require('dotenv').config();

const { Sequelize } = require('sequelize');
const logger = require('../utils/logger');

const sequelize = new Sequelize(process.env.DB_URI, {
    dialectOptions: {
        ssl: {
            require: true,
            rejectUnauthorized: false,
        },
    },
});

// Connect all the models/tables in the database to a db object
const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

// Models / tables
db.users = require('./models/User')(sequelize, Sequelize);
db.configs = require('./models/Config')(sequelize, Sequelize);
db.openseaListingTasks = require('./models/OSListing')(sequelize, Sequelize);
db.openseaFloorTasks = require('./models/OSFloor')(sequelize, Sequelize);
db.openseaUserTasks = require('./models/OSUser')(sequelize, Sequelize);
db.magicedenMoonRankTasks = require('./models/MEMoonRank')(
    sequelize,
    Sequelize
);
db.magicedenNewCollectionsTasks = require('./models/MENewCollections')(
    sequelize,
    Sequelize
);
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

db.users.hasMany(db.magicedenMoonRankTasks);
db.magicedenMoonRankTasks.belongsTo(db.users);

db.users.hasMany(db.magicedenNewCollectionsTasks);
db.magicedenNewCollectionsTasks.belongsTo(db.users);

db.users.hasMany(db.payments);
db.payments.belongsTo(db.users);

db.users.hasOne(db.renewals);
db.renewals.belongsTo(db.users);

// Sync with the db
sequelize
    .sync({ force: false })
    .then(() => logger.log('DB successfully synchronized', 1));

module.exports = db;
