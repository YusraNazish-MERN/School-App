const express = require("express");
const { getAssignments } = require("../controllers/studentController");
const router = express.Router();

router.get("/:studentId/assignments", getAssignments);

module.exports = router;