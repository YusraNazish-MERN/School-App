const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("schooldb", "postgres", "your_password", {
  host: "localhost",
  dialect: "postgres",
});

module.exports = sequelize;