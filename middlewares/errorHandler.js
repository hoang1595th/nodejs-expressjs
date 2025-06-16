// middlewares/errorHandler.js

const errorHandler = (err, req, res, next) => {
  console.error(`[Error] ${err.message}`);

  res.status(err.statusCode || 500).json({
    message: err.message || 'Lỗi máy chủ nội bộ',
  });
};

module.exports = errorHandler;
