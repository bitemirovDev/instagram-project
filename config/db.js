const {Sequelize} = require('sequelize')
const dbConf = require('./config')

const sequelize = new Sequelize(dbConf.development.database, dbConf.development.username, dbConf.development.password, {
    host: dbConf.development.host,
    dialect: dbConf.development.dialect,
})

// Проверка соединения с базой

sequelize
    .authenticate()
    .then(() =>{
        console.log('Connection to the database has been established successfully');
    })
    .catch((error) =>{
        console.error('Unable to connect to the database', error);
    })

module.exports = sequelize