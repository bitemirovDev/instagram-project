const { DataTypes } = require('sequelize');
const sequelize = require('../../config/db');
const User = require('../auth/models/User');

const Subscription = sequelize.define('Subscription', {
  subscriber_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: User,
      key: 'id',
    },
  },
  target_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: User,
      key: 'id',
    },
  },
});

Subscription.belongsTo(User, {foreignKey: 'subscriber_id', as: 'subscriber'})
Subscription.belongsTo(User, {foreignKey: 'target_id', as: 'target'})
User.hasMany(Subscription, {foreignKey: 'target_id', as: 'followers'})
User.hasMany(Subscription, {foreignKey: 'subscriber_id', as: 'following'})

module.exports = Subscription;
