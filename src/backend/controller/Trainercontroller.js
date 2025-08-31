const trainerDetails = require("../models/Trainerdb");
exports.addTrainer = async (req, res) => {
  const {
    Firstname,
    Lastname,
    Phonenumber,
    Aadharnumber,
    Email,
    Address,
    Trainingtechnology,
  } = req.body;
  const existingtrainer = await trainerDetails.findOne(
    { Email: Email },
    { id: 1 }
  );
  if (existingtrainer !== null) {
    res.status(409).send("User Already Exisit");
  } else {
    const newtrainer = new trainerDetails({
      Firstname,
      Lastname,
      Phonenumber,
      Aadharnumber,
      Email,
      Address,
      Trainingtechnology,
    });
    await newtrainer.save();
    res.send("Trainer Details Added");
  }
};

exports.getTrainers = async (req, res, next) => {
  try {
    const users = await trainerDetails.find();
    res.json(users);
  } catch (err) {
    res.send(err);
  }
};

exports.getTrainingStudents = async (req, res, next) => {
  try {
    const traineremail = req.params.Email;

    const response = await trainerDetails.aggregate([
      {
        $match: {
          Email: traineremail,
        },
      },
      {
        $lookup: {
          from: "userdetails",
          localField: "_id",
          foreignField: "Trainerid",
          as: "Trainingstudents",
        },
      },
    ]);

    if (response.length > 0) {
      res.json(response);
    } else {
      res
        .status(404)
        .json({ message: "Trainer not found or no students associated." });
    }
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.updateTrainer = async (req, res, next) => {
  try {
    const { Trainerdetailtoupdate } = req.params;
    const {
      Firstname,
      Lastname,
      Phonenumber,
      Aadharnumber,
      Email,
      Address,
      Trainingtechnology,
    } = req.body;
    const updateduser = await trainerDetails.findOneAndUpdate(
      { Email: Trainerdetailtoupdate },
      {
        Firstname,
        Lastname,
        Phonenumber,
        Aadharnumber,
        Email,
        Address,
        Trainingtechnology,
      }
    );
    return res.send(200);
  } catch (error) {
    res.send(400);
  }
};

exports.deleteTrainer = async (req, res, next) => {
  try {
    const { Traineremail } = req.params;

    if (!Traineremail) {
      return res.status(400).json({ error: "Email is required." });
    }

    const deleteduser = await trainerDetails.findOneAndDelete({
      Email: Traineremail,
    });

    if (!deleteduser) {
      return res.status(404).json({ error: "Trainer not found" });
    }

    res.status(204).end();
  } catch (error) {
    res.status(400);
  }
};

exports.getTrainersByCourse = async (req, res, next) => {
  try {
    const course = req.params.Userchoosencourse;
    const response = await trainerDetails.aggregate([
      {
        $match: {
          Trainingtechnology: course,
        },
      },
    ]);
    res.json(response);
  } catch (error) {
    res.status(500).json({ error: "Something went wrong" });
  }
};
