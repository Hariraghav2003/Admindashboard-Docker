const fs = require("fs");
const path = require("path");
const ensureDirectoryExists = (folderPath) => {
  const fullPath = path.join(__dirname, "..", folderPath);

  if (!fs.existsSync(fullPath)) {
    fs.mkdirSync(fullPath, { recursive: true });
  }
};

module.exports = { ensureDirectoryExists };
