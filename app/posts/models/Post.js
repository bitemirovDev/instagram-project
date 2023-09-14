const { DataTypes } = require('sequelize');
const sequelize = require('../../../config/db')
const User = require('../../auth/models/User')
const Filter = require('./Filter')

const Post = sequelize.define('Post', {
  media: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  caption: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
});

Post.belongsTo(User, {foreignKey: 'user_id', as: 'user'})
Post.belongsTo(Filter, {foreignKey: 'filter_id', as: 'filter'})
User.hasMany(Post, {foreignKey: 'user_id', as: 'posts'})

module.exports = Post