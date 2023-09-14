const { DataTypes } = require('sequelize');
const sequelize = require('../../../config/db')
const User = require('../../auth/models/User')
const Post = require('../../posts/models/Post')

const Comment = sequelize.define('Comment', {
  comment: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
});

Comment.belongsTo(Post, {foreignKey: 'post_id', as: 'post'})
Comment.belongsTo(User, { foreignKey: 'user_id', as: 'user'});
Post.hasMany(Comment, {foreignKey: 'post_id', as: 'comments'})

module.exports = Comment