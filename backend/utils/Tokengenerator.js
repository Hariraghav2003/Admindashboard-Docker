const jwt = require("jsonwebtoken");
const tokengenerator = (id, Access) => {
  const token = jwt.sign({ id, Access }, process.env.JWT_KEY, {
    expiresIn: "1h",
  });

  return token;
};
module.exports = tokengenerator;
