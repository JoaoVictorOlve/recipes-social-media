const Sequelize = require('sequelize');
const sequelize = new Sequelize({
  database: 'recipes_website',
  host: 'localhost', // usually 'localhost'
  dialect: 'mysql',
  username: 'root'
});

module.exports = sequelize;