const fs = require('fs');
const path = require('path');

const dataPath = path.join(__dirname, '../data/users.json');

// Helper: đọc dữ liệu từ file
function readUsers() {
  const data = fs.readFileSync(dataPath);
  return JSON.parse(data);
}

// Helper: ghi dữ liệu vào file
function writeUsers(users) {
  fs.writeFileSync(dataPath, JSON.stringify(users, null, 2));
}

module.exports = {
  readUsers,
  writeUsers
};