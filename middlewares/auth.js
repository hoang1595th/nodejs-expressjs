const jwt = require('jsonwebtoken');
const { checkPublicRoute } = require('../utils/auth'); // Import hàm kiểm tra route public

const authMiddleware = (req, res, next) => {
  // Kiểm tra xem route có phải là public route không
  const isPublicRoute = checkPublicRoute(req.path);
  console.log('isPublicRoute:', isPublicRoute);
  if (isPublicRoute) {
    return next(); // Nếu là public route, cho phép tiếp tục
  }
  
  // Nếu không phải public route, kiểm tra token
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Bearer <token>

  if (!token) return res.status(401).json({ message: 'Không có token' });

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    console.log('payload:', payload);
    req.user = payload;
    next();
  } catch (err) {
    return res.status(403).json({ message: 'Token không hợp lệ' });
  }
};

module.exports = authMiddleware;
