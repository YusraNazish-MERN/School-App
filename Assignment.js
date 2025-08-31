const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const User = require("./User");

const Assignment = sequelize.define("Assignment", {
  title: { type: DataTypes.STRING, allowNull: false },
  status: { 
    type: DataTypes.ENUM("pending", "done"),
    defaultValue: "pending"
  },
  grade: { type: DataTypes.STRING }
});

Assignment.belongsTo(User, { as: "student", foreignKey: "studentId" });
Assignment.belongsTo(User, { as: "teacher", foreignKey: "teacherId" });

module.exports = Assignment;