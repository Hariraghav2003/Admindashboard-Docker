const express = require("express");
const { signIn } = require("../controller/Signincontroller");
const router = express.Router();
router.post("/", signIn);
module.exports = router;
