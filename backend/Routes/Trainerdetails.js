const express = require("express");
const router = express.Router();
const {
  addTrainer,
  getTrainers,
  getTrainingStudents,
  updateTrainer,
  deleteTrainer,
  getTrainersByCourse,
} = require("../controller/Trainercontroller");

router.post("/trainerdetail", addTrainer);

router.get("/gettrainerdetail", getTrainers);

router.get("/trainingstudents/:Email", getTrainingStudents);

router.put("/updatetrainer/:Trainerdetailtoupdate", updateTrainer);

router.delete("/deletetrainer/:Traineremail", deleteTrainer);

router.get("/gettrainerdetail/:Userchoosencourse", getTrainersByCourse);

module.exports = router;
