const sequelize = require("../config/db");
const User = require("./User");
const Assignment = require("./Assignment");

async function syncDB() {
  await sequelize.sync({ alter: true });
  console.log("✅ Database synced");
}

module.exports = { sequelize, User, Assignment, syncDB };