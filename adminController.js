const { User, Assignment } = require("../models");

exports.getOverview = async (req, res) => {
  const users = await User.findAll();
  const assignments = await Assignment.findAll();
  res.json({ users, assignments });
};