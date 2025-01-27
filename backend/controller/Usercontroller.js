const mongoose = require("mongoose");
const userDetails = require("../models/Userdb");

exports.addUser = async (req, res) => {
  const createdby = req.cookies.Email;
  const {
    Firstname,
    Lastname,
    Collegename,
    Phonenumber,
    Aadharnumber,
    Email,
    Address,
    Role,
    Userchoosencourse,
    Firstinstallment,
    Remainingamount,
    Secondinstallment,
    Thirdinstallment,
    Courseamount,
    Paymentstatus,
    Duration,
    Userstatus,
    Dateofjoining,
    Trainerid,
    Createdat
  } = req.body;
  const Objid = new mongoose.Types.ObjectId(Trainerid);
  const existinguser = await userDetails.findOne({ Email: Email }, { id: 1 });
  if (existinguser !== null) {
    res.status(409).send("User Already Exists");
  } else {
    const newuser = new userDetails({
      Firstname,
      Lastname,
      Collegename,
      Phonenumber,
      Aadharnumber,
      Email,
      Address,
      Role,
      Userchoosencourse,
      Firstinstallment,
      Remainingamount,
      Secondinstallment,
      Thirdinstallment,
      Courseamount,
      Paymentstatus,
      Duration,
      Userstatus,
      Dateofjoining,
      Trainerid: Objid,
      Createdby: createdby,
      Createdat
    });
    await newuser.save();
    res.send("User Details Added");
  }
};

exports.getUsers = async (req, res, next) => {
  try {
    const users = await userDetails.find().sort({_id:-1});
    res.json(users);
  } catch (err) {
    res.send(err);
  }
};

exports.updateUser = async (req, res, next) => {
  try {
    const { userdetailtoUpdate } = req.params;
    const {
      Secondinstallment,
      Thirdinstallment,
      Remainingamount,
      Paymentstatus,
      Trainerid,
    } = req.body;
    let Objid;
    let updateFields = {};
    if (Trainerid !== undefined) {
      Objid = new mongoose.Types.ObjectId(Trainerid);
      updateFields.Trainerid = Objid;
    }

    const updateduser = await userDetails.findOneAndUpdate(
      { Email: userdetailtoUpdate },
      {
        Secondinstallment,
        Thirdinstallment,
        Remainingamount,
        Paymentstatus,
        ...(Trainerid !== undefined && { Trainerid: Objid }),
      }
    );

    return res.sendStatus(200);
  } catch (error) {
    res.send(400);
  }
};

exports.updateUserTrainer = async (req, res, next) => {
  try {
    const { userdetailtoUpdate } = req.params;
    let { Trainerid } = req.body;
    let Objid;
    if (Trainerid !== undefined) {
      Objid = new mongoose.Types.ObjectId(Trainerid);
      Trainerid = Objid;
    }

    const updateduser = await userDetails.findOneAndUpdate(
      { Email: userdetailtoUpdate },
      {
        ...(Trainerid !== undefined && { Trainerid: Objid }),
      }
    );

    return res.sendStatus(200);
  } catch (error) {
    //console.log(error);
    res.send(400);
  }
};

exports.updateUserStatus = async (req, res, next) => {
  try {
    const { Email } = req.params;
    const { Userstatus, isActive } = req.body;
    if (!Userstatus) {
      return res.status(400).json({ error: "Userstatus is required" });
    }

    const updatedUser = await userDetails.findOneAndUpdate(
      { Email: Email },
      { Userstatus: Userstatus, isActive: isActive }
    );

    if (!updatedUser) {
      return res.status(404).json({ error: "User not found" });
    }

    return res
      .status(200)
      .json({ message: "User status updated successfully", updatedUser });
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.deleteUser = async (req, res, next) => {
  try {
    const { Email } = req.params;

    if (!Email) {
      return res.status(400).json({ error: "Email is required." });
    }

    const deleteduser = await userDetails.findOneAndDelete({
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

exports.findUsersByDate = async (req, res, next) => {
  const { fromdate, todate } = req.body;
  try {
    // Make sure fromdate and todate are in a proper Date format
    const response = await userDetails.find({
      Dateofjoining: {
        $gte: fromdate,
        $lte: todate,
      },
    });

    res.json(response);
  } catch (err) {
    next(err); // Pass any error to the error handler
  }
};
