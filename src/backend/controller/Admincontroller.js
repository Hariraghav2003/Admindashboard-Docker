const userCredentials = require("../models/Usercredentialsdb");
const { generatePassword } = require("../utils/Hashgenrator");
exports.addAdmin = async (req, res, next) => {
  try {
    const { Firstname, Lastname, Phonenumber, Email, Access, Password } =
      req.body;
    const properuserdata = Email.trim();
    const existinguser = await userCredentials.findOne(
      {
        Email: properuserdata,
      },
      { id: 1 }
    );
    const encryptedpass = await generatePassword(Password);
    if (existinguser !== null) {
      return res.status(409).send("Email is already registered.");
    } else {
      const newuser = new userCredentials({
        Firstname,
        Lastname,
        Phonenumber,
        Email,
        Access,
        Password: encryptedpass,
      });
      const saveduser = await newuser.save();
      res.status(200).send("Registered Successfully!!");
    }
  } catch (error) {
    res.send(error);
  }
};

exports.getAdmin = async (req, res, next) => {
  try {
    const users = await userCredentials.find();
    res.json(users);
  } catch (err) {
    res.send(err);
  }
};

exports.updateAdmin = async (req, res, next) => {
  try {
    const { AdminToUpdate } = req.params;
    const { Access, Password } = req.body;
    const encryptedpass = await generatePassword(Password);
    const updateduser = await userCredentials.findOneAndUpdate(
      { Email: AdminToUpdate },
      {
        $set: {
          Access: Access,
          Password: encryptedpass,
        },
      }
    );
    return res.send(200);
  } catch (error) {
    //console.log(error);
  }
};

exports.deleteAdmin = async (req, res, next) => {
  try {
    const { Email } = req.params;

    if (!Email) {
      return res.status(400).json({ error: "Email is required." });
    }

    const deleteduser = await userCredentials.findOneAndDelete({
      Email: Email,
    });

    if (!deleteduser) {
      return res.status(404).json({ error: "User not found." });
    }

    res.status(204).end();
  } catch (error) {
    res.status(400);
  }
};

exports.checkUser = async (req, res, next) => {
  const loggedinuseremail = req.cookies.Email;

  const loggedinuser = await userCredentials.findOne({
    Email: loggedinuseremail,
  });

  if (!loggedinuser) {
    res.status(400).send();
  } else {
    res.json(loggedinuser);
  }
};
