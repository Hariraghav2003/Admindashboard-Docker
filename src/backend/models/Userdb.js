const userdb = require("mongoose");
//User Schema
const userschema = new userdb.Schema({
  Firstname: {
    required: true,
    type: String,
  },
  Lastname: {
    required: true,
    type: String,
  },
  Collegename: {
    required: true,
    type: String,
  },
  Phonenumber: {
    required: true,
    type: Number,
  },
  Aadharnumber: {
    required: true,
    type: Number,
  },
  Email: {
    required: true,
    type: String,
  },
  Address: {
    required: true,
    type: String,
  },
  Duration: {
    required: true,
    type: String,
  },
  Role: {
    required: true,
    type: String,
  },
  Userchoosencourse: {
    required: true,
    type: String,
  },
  Firstinstallment: {
    required: true,
    type: Number,
  },
  Remainingamount: {
    required: true,
    type: Number,
  },
  Secondinstallment: {
    required: true,
    type: Number,
  },
  Thirdinstallment: {
    required: true,
    type: Number,
  },
  Courseamount: {
    required: true,
    type: Number,
  },
  Paymentstatus: {
    required: true,
    type: String,
  },
  Userstatus: {
    required: true,
    type: String,
  },
  Dateofjoining: {
    required: true,
    type: String,
  },
  Trainerid: {
    required: true,
    type: userdb.Schema.Types.ObjectId,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  Createdby: {
    required: true,
    type: String,
  },
  Createdat: {
    required: true,
    type: String,
  },
});

//User Model
const userdetails = userdb.model("userdetails", userschema);
module.exports = userdetails;
