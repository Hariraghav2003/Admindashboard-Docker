const cookieParser = require("cookie-parser");
const express = require("express");
const router = express.Router();
const { newInvoice } = require("../controller/Invoicecontroller");

router.use(cookieParser());
router.post("/invoice", newInvoice);
module.exports = router;
