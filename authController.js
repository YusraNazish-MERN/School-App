const { User } = require("../models");

exports.login = async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ where: { username, password } });
  if (!user) return res.status(401).json({ message: "Invalid credentials" });
  res.json(user);
};