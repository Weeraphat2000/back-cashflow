const JWT = require("jsonwebtoken");

const secret = process.env.SECRET;
const expire = process.env.EXPIRE;

exports.sign = (payload) => JWT.sign(payload, secret, { expiresIn: expire });

exports.verify = (token) => JWT.verify(token, secret);
