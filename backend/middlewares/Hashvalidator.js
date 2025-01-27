const bcrypt = require("bcryptjs");
const hashvalidator = async (plainpassword, encryptedpassword) => {
  const result = await bcrypt.compare(plainpassword, encryptedpassword);
  return result;
};
module.exports = hashvalidator;
