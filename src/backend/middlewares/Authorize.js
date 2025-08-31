const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const express = require("express");
const routes = express.Router();
routes.use(cookieParser());

const Authorize = (allowedRoles) => (req, res, next) => {
  const token = req.cookies.jwt;
  if (!token) {
    return res.status(403).json({ message: "No token provided" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_KEY);
    req.user = decoded;
    const hasAccess = decoded.Access.some((role) =>
      allowedRoles.includes(role)
    );

    if (hasAccess) {
      next();
    } else {
      res.status(403).json({ message: "Access denied" });
    }
  } catch (error) {
    //console.log(error);
  }
};
module.exports = { Authorize };
