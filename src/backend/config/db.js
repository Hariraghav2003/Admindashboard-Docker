const db = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();
async function connectDB() {
    
    const dbHost = '91.108.105.231'; // or server IP
    const dbPort = '3002'; // default MongoDB port
    const dbName = 'Admindashboard'
    const mongoURI = `mongodb://${dbHost}:${dbPort}/${dbName}`;
    console.log(mongoURI);
    try {
      await db.connect(mongoURI);
      console.log("Database connected successfully");
    } catch (err) {
      console.log("Database connection error:", err);
    }
  }
module.exports = connectDB;
