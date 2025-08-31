const express = require("express");
const router = express.Router();
const { Authentication } = require("../middlewares/Authentication.js");

router.get("/home", Authentication, async (req, res) => {
  res.status(200).send("Hello");
});

router.get("/signout", (req, res, next) => {
  req.cookies.jwt;
  req.cookies.Email;
  res.clearCookie("jwt", {
    path: "/",
  });

  res.clearCookie("Email", {
    path: "/",
  });
  res.status(200).send("Cookie cleared");
});

router.get("/getcookie", (req, res) => {
  const myCookie = req.cookies.jwt;
  try {
    if (myCookie) {
      res.status(200).send("Cookie Found!!");
    }
  } catch (error) {
    //console.log(error);
  }
});

module.exports = router;
