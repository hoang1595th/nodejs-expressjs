// app.js
const express = require('express');
const app = express();
const userRoutes = require('./routes/user.routes'); // Import các route cho người dùng
const authRoutes = require('./routes/auth.routes'); // Import các route cho xác thực người dùng
const logger = require('./middlewares/logger'); // Import middleware logger
const authMiddleware = require('./middlewares/auth'); // Import middleware xác thực
require('dotenv').config(); // load biến môi trường

/* ------------------------------- middleware ------------------------------- */
app.use(express.json()); // Middleware để parse JSON từ request body
app.use(logger); // Sử dụng middleware logger để ghi log các request
app.use(authMiddleware); // Sử dụng middleware xác thực cho tất cả các route

/* ------------------------------- routes ---------------------------------- */
app.use('/users', userRoutes); // Sử dụng các route cho người dùng
app.use('/auth', authRoutes); // Sử dụng các route cho người dùng
app.get('/', (req, res) => {
  res.send('Chào mừng đến với Express.js!');
});

/*------------------------------- connect database ------------------------- */
const connectDB = require('./config/db');
connectDB().then(() => {
  /* ------------------------------- server setup ---------------------------- */
  const PORT = process.env.PORT || 3030;
  app.listen(PORT, () => {
    console.log(`Server đang chạy tại http://localhost:${PORT}`);
  });
});

/* ------------------------------- error handling -------------------------- */
const errorHandler = require('./middlewares/errorHandler'); // Import middleware xử lý lỗi
app.use(errorHandler); // Sử dụng middleware xử lý lỗi
// Đảm bảo middleware xử lý lỗi được đặt sau tất cả các route
// để nó có thể xử lý các lỗi phát sinh từ các route hoặc middleware trước đó
