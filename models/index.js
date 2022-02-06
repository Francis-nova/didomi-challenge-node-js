const dbConfig = require('./../configs/db.js');
const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize(
    dbConfig.DB, 
    dbConfig.USER, 
    dbConfig.PASSWORD, {
        host: dbConfig.HOST,
        dialect: dbConfig.dialect,
        logging: false // stop logging
    }
);

// authenticate 
sequelize.authenticate()
    .then(() => {}) 
    .catch();

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

// Tables
db.users = require('./userModel.js')(sequelize, DataTypes);
db.events = require('./eventModel.js')(sequelize, DataTypes);

db.sequelize.sync({force: false, logging: false})
    .then(() => {});

module.exports = db;