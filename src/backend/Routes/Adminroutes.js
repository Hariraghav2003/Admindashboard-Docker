const express = require("express"); // loading Express.js  Frame work in express variable
const {
  checkUser,
  deleteAdmin,
  updateAdmin,
  getAdmin,
  addAdmin,
} = require("../controller/Admincontroller");
const router = express.Router(); // loading router from express in the router constant

//Admin router
router.post("/addadmin", addAdmin);

router.get("/getadmins", getAdmin);

router.put("/updateadmin/:AdminToUpdate", updateAdmin);

router.delete("/deleteadmin/:Email", deleteAdmin);
router.get("/checkuser", checkUser);
module.exports = router;
