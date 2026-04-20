// SQL Controller
// Executes SQL Queries

const {DataTypes} = require('sequelize');

// https://blog.postman.com/how-to-create-a-rest-api-with-node-js-and-express/

const UserModel = {
    id: {type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true},
    name: { type: DataTypes.STRING, allowNull: false },
    department : { type: DataTypes.STRING, allowNull: false },
    salary: { type: DataTypes.FLOAT, allowNull: false },
    email: { type: DataTypes.STRING, allowNull: true },
    created_at: { type: DataTypes.TIME, allowNull: false },
    updated_at: { type: DataTypes.TIME, allowNull: false },
    status: { type: DataTypes.STRING , allowNull: false },
}

module.exports = (sequelize) => sequelize.define('user', UserModel);
