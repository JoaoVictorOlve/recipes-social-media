// comment.js
const { Sequelize, Model } = require('sequelize'); // Import Model
const sequelize = require('../db');
const User = require('./user');
// Remove the Recipe import from here

class Comment extends Model {} // Extend Model

Comment.init(
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    comment: {
      type: Sequelize.TEXT
    },
    status: {
        type: Sequelize.ENUM('active', 'deleted'), // Add the status enum field
        defaultValue: 'active' // Set a default value
      }  
  },
  {
    sequelize,
    modelName: 'Comment', // Set the model name explicitly
    timestamps: false
  }
);

Comment.belongsTo(User, { foreignKey: 'user_id' });

module.exports = Comment;
