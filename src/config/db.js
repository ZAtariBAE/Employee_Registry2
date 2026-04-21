//Initializes Connection to DB

const { Sequelize } = require ('sequelize');

const sequelize = new Sequelize ('employeerecords', 'root', 'Zatari', {
    dialect: 'mysql',
    host: 'localhost'
});

module.exports = sequelize;