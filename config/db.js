// config/db.js
const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    console.log('🔗 Đang kết nối MongoDB...');
    await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:3030/userdb');
    console.log('✅ Đã kết nối MongoDB');
  } catch (err) {
    console.error('❌ Kết nối MongoDB thất bại', err.message);
    process.exit(1);
  }
};

module.exports = connectDB;
