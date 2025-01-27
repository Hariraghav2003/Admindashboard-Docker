const courseDetails = require("../models/Coursedb");
exports.addCourse = async (req, res) => {
  const { Course, Amount } = req.body;
  const existingcourse = await courseDetails.findOne(
    { Course: Course },
    { id: 1 }
  );
  if (existingcourse !== null) {
    return res.status(409).send("Course already exists.");
  } else {
    const newcourse = new courseDetails({ Course, Amount });
    await newcourse.save();
    res.send(newcourse);
  }
};

exports.getCourse = async (req, res, next) => {
  try {
    const courses = await courseDetails.find();
    res.json(courses);
  } catch (err) {
    res.send(err);
  }
};

exports.updateCourse = async (req, res, next) => {
  try {
    const { courseName } = req.params; // Extracting course name from URL
    const { Amount } = req.body; // Extracting Amount from the request body

    if (!Amount) {
      return res.status(400).send({ error: "Amount is required" });
    }

    // To find and update the course by its name
    const updatedCourse = await courseDetails.findOneAndUpdate(
      { Course: courseName },
      { $set: { Amount } }
    );

    if (!updatedCourse) {
      return res.status(404);
    }

    return res.status(200).send("User Details Updated");
  } catch (error) {
    //console.log(error);
    res
      .status(500)
      .send({ error: "An error occurred while updating the course" });
  }
};

exports.deleteCourse = async (req, res, next) => {
  try {
    const { courseName } = req.params;

    if (!courseName) {
      return res.status(400);
    }
    const deletedCourse = await courseDetails.findOneAndDelete({
      Course: courseName,
    });

    if (!deletedCourse) {
      return res.status(404).json({ error: "Course not found." });
    }

    res.status(204).end();
  } catch (error) {
    res.status(400);
  }
};
