const { DataTypes } = require('sequelize');
const sequelize = require('../../../config/db')
const User = require('../../auth/models/User')

const Story = sequelize.define('Story', {
  media: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
});

Story.belongsTo(User, {foreignKey: 'user_id'})
User.hasMany(Story, {foreignKey: 'user_id', as: 'stories'})

module.exports = Story