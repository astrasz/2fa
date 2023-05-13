import { Sequelize } from "sequelize";
import configSettings from '../config/config.json' assert {
    type: "json"
}

import getUserModel from './user.js';

const env = process.env.NODE_ENV || 'dev';
const config = configSettings[env];


const sequelize = new Sequelize({
    database: config.database,
    dialect: config.dialect,
    storage: config.storage,
    logging: false
})

const models = {
    User: getUserModel(sequelize, Sequelize)
}


export { sequelize };
export default models;