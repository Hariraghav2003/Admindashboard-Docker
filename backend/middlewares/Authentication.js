const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const express = require("express");
const routes = express.Router();
routes.use(cookieParser());

// Token validation function
const tokenvalidator = (token) => {
  try {
    const data = jwt.verify(token, process.env.JWT_KEY);
    return data; // Return decoded token data if valid
  } catch (error) {
    //console.log("Token validation failed:", error);
    return null; // Return null if token is invalid
  }
};

//Authentication middleware
const Authentication = async (req, res, next) => {
  try {
    const token = req.cookies.jwt; // Extract JWT token from cookies
    if (!token) {
      return res.status(401).send("Kindly Sign-in to continue");
    }
    const valid = await tokenvalidator(token); // Validate token
    if (valid) {
      next(); // Token is valid, proceed with the request
    } else {
      res.status(403).send("Access denied."); // Invalid token
    }
  } catch (error) {
    res.status(500).send("Internal server error.");
  }
};

module.exports = { Authentication }; // Export the middleware
