const express = require("express");
const router = express.Router();
const {
  addCourse,
  getCourse,
  updateCourse,
  deleteCourse,
} = require("../controller/Coursecontroller");

router.post("/coursedetails", addCourse);

router.get("/getcourse", getCourse);

router.put("/updatecourse/:courseName", updateCourse);

router.delete("/deletecourse/:courseName", deleteCourse);

module.exports = router;
