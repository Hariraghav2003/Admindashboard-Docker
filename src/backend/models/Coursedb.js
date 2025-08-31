const coursedb = require("mongoose");
//Course Schema Creation
const courseschema = new coursedb.Schema({
  Course: {
    required: true,
    type: String,
  },
  Amount: {
    required: true,
    type: Number,
  },
});

//Course Model
const coursedetails = coursedb.model("course", courseschema);
module.exports = coursedetails; //Exporting Course Model(Coursedetilasdb)
