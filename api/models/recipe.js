// recipe.js
const { Sequelize, Model } = require('sequelize'); // Import Model
const sequelize = require('../db');
const User = require('./user');
const Comment = require('./comment'); // Import the Comment model

class Recipe extends Model {} // Extend Model

Recipe.init(
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    title: {
      type: Sequelize.STRING,
      allowNull: false
    },
    ingredients: {
      type: Sequelize.TEXT,
      allowNull: false
    },
    instructions: {
      type: Sequelize.TEXT,
      allowNull: false
    },
    image: {
      type: Sequelize.STRING
    },
    status: {
        type: Sequelize.ENUM('active', 'deleted'), // Add the status enum field
        defaultValue: 'active' // Set a default value
      }  
  },
  {
    sequelize,
    modelName: 'Recipe', // Set the model name explicitly
    timestamps: false
  }
);

Recipe.belongsTo(User, { foreignKey: 'user_id' });
Recipe.hasMany(Comment, { foreignKey: 'recipe_id' });

module.exports = Recipe;
