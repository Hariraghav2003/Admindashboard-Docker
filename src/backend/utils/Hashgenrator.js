const bcrypt = require("bcryptjs");
const saltlvl = 10;
const generatePassword = async (plainpassword) => {
  const salt = await bcrypt.genSalt(saltlvl);
  const encryptedpass = await bcrypt.hash(plainpassword, salt);
  return encryptedpass;
};

module.exports = { generatePassword };
