const  Sequelize  = require("sequelize");
const userModel = require('./models/user');

const sequelize = new Sequelize('ejemplo_kevin', 'root', '', {
    host : 'localhost',
    dialect : 'mysql',

});

const User = userModel(sequelize, Sequelize);

sequelize.sync({ force: true}).then(() => console.log('Connection has been established successfully.'))
  
module.exports = {
    User
}