const { Assignment } = require("../models");

exports.getAssignments = async (req, res) => {
  const { studentId } = req.params;
  const assignments = await Assignment.findAll({ where: { studentId } });
  res.json(assignments);
};