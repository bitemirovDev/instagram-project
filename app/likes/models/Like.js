const { DataTypes } = require('sequelize');
const sequelize = require('../../../config/db'); // Подключение к вашей базе данных
const User = require('../../auth/models/User')

const Like = sequelize.define('Like', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  entity_type: {
    type: DataTypes.STRING, // Тип сущности (post, comment, story)
    allowNull: false,
  },
  entity_id: {
    type: DataTypes.INTEGER, // Идентификатор сущности
    allowNull: false,
  },
});

Like.belongsTo(User, {foreignKey: 'user_id'})

module.exports = Like;
