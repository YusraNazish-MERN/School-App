const express = require("express");
const { getStudents } = require("../controllers/teacherController");
const router = express.Router();

router.get("/:teacherId/students", getStudents);

module.exports = router;