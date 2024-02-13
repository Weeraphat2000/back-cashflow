const bcrypt = require("bcryptjs");

exports.hash = (password) => bcrypt.hash(password, 12);
