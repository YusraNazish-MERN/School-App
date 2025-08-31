const { Assignment, User } = require("../models");

exports.getStudents = async (req, res) => {
  const { teacherId } = req.params;
  const assignments = await Assignment.findAll({
    where: { teacherId },
    include: [{ model: User, as: "student" }]
  });
  res.json(assignments);
};