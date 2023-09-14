const { DataTypes } = require('sequelize');
const sequelize = require('../../../config/db')

const Filter = sequelize.define('Filter', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
},
{
    timestamps: false,
});


module.exports = Filter