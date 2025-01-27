const express = require("express");
const cookieParser = require("cookie-parser");
const {
  addUser,
  getUsers,
  updateUser,
  updateUserStatus,
  deleteUser,
  findUsersByDate,
  updateUserTrainer,
} = require("../controller/Usercontroller");

const router = express.Router();
router.use(cookieParser());

// Routes
router.post("/userdetail", addUser);
router.get("/getuserdetail", getUsers);
router.put("/updateuser/:userdetailtoUpdate", updateUser);
router.put("/updateusertrainer/:userdetailtoUpdate", updateUserTrainer);
router.put("/updateuserstatus/:Email", updateUserStatus);
router.delete("/deleteuser/:Email", deleteUser);
router.post("/userfind", findUsersByDate);

module.exports = router;
