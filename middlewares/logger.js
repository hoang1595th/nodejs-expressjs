// middlewares/logger.js

const logger = (req, res, next) => {
  const now = new Date().toISOString();
  const { method, url } = req;
  console.log(`[${now}] ${method} ${url}`);
  next(); // tiếp tục sang middleware hoặc route kế tiếp
};

module.exports = logger;
