const trainerdb = require("mongoose");
//Trainer Schema
const trainerschema = new trainerdb.Schema({
  Firstname: {
    required: true,
    type: String,
  },
  Lastname: {
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
  Trainingtechnology: {
    required: true,
    type: String,
  },
});

//Trainer Model
const trainerdetails = trainerdb.model("trainerdetails", trainerschema);
module.exports = trainerdetails; //Exporting Trainer Model(Trainerdetilasdb)
