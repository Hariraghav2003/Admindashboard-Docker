const db = require("mongoose");
//Admin Credentials Schema Creation
const userschema = new db.Schema({
  Firstname: {
    type: String,
    required: true,
  },
  Lastname: {
    type: String,
    required: true,
  },
  Phonenumber: {
    type: String,
    required: true,
  },
  Email: {
    type: String,
    required: true,
  },
  Access: {
    type: [String],
    required: true,
  },
  Password: {
    type: String,
    required: true,
  },
});

//Admin Model
const usercredentials = db.model("usercredentials", userschema);
module.exports = usercredentials; //Exporting User Model(Userdb)
