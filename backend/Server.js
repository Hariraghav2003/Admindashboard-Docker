const cors = require("cors");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const express = require("express");
const path = require("path");

const connectDB = require("./config/db.js");
const User = require("./Routes/Userdetails.js");
const Usercredentials = require("./Routes/Usercredentials");
const Course = require("./Routes/Course");
const Trainer = require("./Routes/Trainerdetails");
const Invoice = require("./Routes/Invoicedetails");
const Adminroutes = require("./Routes/Adminroutes");
const accessRoutes = require("./Routes/Accessroutes.js");
const pageRoutes = require("./Routes/Pageroutes.js");
// const expenseroutes = require("./Routes/Expense.js");
// const walletroutes = require("./Routes/Wallet.js");

const app = express();
dotenv.config();
const port = process.env.PORT || 3000;


// Configure CORS
const corsOptions = {
  origin: ["http://91.108.105.231:3001","http://localhost:3002"],// Allow your frontend origin
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE", // Allowed HTTP methods
  credentials: true, // If you need to send cookies
  optionsSuccessStatus: 204,
};

app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(cookieParser());

// Middleware to allow all methods for all routes (Make sure this is below CORS middleware)
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Methods","GET, POST, PUT, DELETE, OPTIONS, PATCH");
  res.header('Access-Control-Allow-Credentials',true);
  res.header("Access-Control-Allow-Origin", "http://91.108.105.231:3001","http://localhost:3002");
  res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type,Authorization');
  next();
});


connectDB();

// Route Definitions
app.use(Usercredentials);
app.use(Course);
app.use(User);
app.use(Trainer);
app.use(Invoice);
app.use(Adminroutes);
app.use(accessRoutes);
app.use(pageRoutes);
// app.use(expenseroutes);
// app.use(walletroutes);

app.use("/uploads", express.static(path.join(__dirname, "uploads")));


// Server Start
app.listen(port, '0.0.0.0',() => {
  console.log(`Server is listening on port ${port}`);
});

