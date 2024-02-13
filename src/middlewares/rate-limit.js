const { rateLimit } = require("express-rate-limit");

module.exports = rateLimit({
  windowMs: 10000 * 60 * 5,
  limit: 1000,
  message: { message: "too many reqest in a given period" },
});
