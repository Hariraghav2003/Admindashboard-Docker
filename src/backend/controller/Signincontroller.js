const userCredentials = require("../models/Usercredentialsdb");
const hashValidator = require("../middlewares/Hashvalidator");
const tokenGenerator = require("../utils/Tokengenerator");
exports.signIn = async (req, res, next) => {
  try {
    const { Email, Password } = req.body;
    const existinguser = await userCredentials.findOne(
      { Email: Email },
      { id: 1, Password: 1, Access: 1 }
    );
    if (!existinguser) {
      res.status(400).send("Invalid Email!!");
    } else {
      const authenticatinguser = await hashValidator(
        Password,
        existinguser.Password
      );

      if (!authenticatinguser) {
        res.status(401).send("Invalid Password");
      } else {
        try {
          const id = existinguser._id;

          const Access = existinguser.Access;
          const token = await tokenGenerator(id, Access);

          res
            .cookie("jwt", token, {
              // secure:true, //For testing
              // sameSite: "None",
              maxAge: 60 * 60 * 1000, // 1 hour expiration
              path: "/",
       
            })
            .cookie("Email", Email, {
              // secure:true,//For testing
              // sameSite: "None",
              maxAge: 60 * 60 * 1000, // 1 hour expiration
              path: "/",
            })
            .send("Successfully logged in!");
        } catch (error) {
          res.send(error);
        }
      }
    }
  } catch (err) {
    //console.log(err);
  }
};
