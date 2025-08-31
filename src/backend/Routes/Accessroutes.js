const express = require("express");
const router = express.Router();
const { Authorize } = require("../middlewares/Authorize");

router.get("/adminpageaccess", Authorize(["Admin"]), (req, res, next) => {
  res.status(200).send("Authorized User!!");
});

router.get("/userpageaccess", Authorize(["User"]), (req, res, next) => {
  res.status(200).send("Authorized User!!");
});

router.get("/trainerpageaccess", Authorize(["Trainer"]), (req, res, next) => {
  res.status(200).send("Authorized User!!");
});

router.get("/reportpageaccess", Authorize(["Report"]), (req, res, next) => {
  res.status(200).send("Authorized User!!");
});

router.get("/invoicepageaccess", Authorize(["Invoice"]), (req, res, next) => {
  res.status(200).send("Authorized User!!");
});

router.get(
  "/technologypageaccess",
  Authorize(["Technology"]),
  (req, res, next) => {
    res.status(200).send("Authorized User!!");
  }
);

router.get("/rolepageaccess", Authorize(["Role"]), (req, res, next) => {
  res.status(200).send("Authorized User!!");
});

router.get("/expensepageaccess", Authorize(["Expense"]), (req, res, next) => {
  res.status(200).send("Authorized User!!");
});

router.get("/updatetraineraccess", Authorize(["Admin"]), (req, res, next) => {
  res.status(200).send("Authorized User!!");
});

router.get("/deletetraineraccess", Authorize(["Admin"]), (req, res, nex) => {
  res.status(200).send("Authorized User!!");
});

module.exports = router;
