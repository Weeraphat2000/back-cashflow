const { verify } = require("../services/jwt-service");
const { findUserById } = require("../services/user-service");
const { createError } = require("../utils/create-error");

const authenticate = async (req, res, next) => {
  try {
    const authorization = req.headers.authorization;
    // console.log(req.headers);
    if (!authorization || !authorization.startsWith("Bearer")) {
      createError("invalid authorization header", 401);
    }
    const token = authorization.split(" ")[1];
    const decodedPayload = verify(token);
    // console.log(decodedPayload);
    const user = await findUserById(decodedPayload.userId);
    if (!user) {
      createError("user was not found", 401);
    }
    delete user.password;

    req.user = user;
    next();
  } catch (err) {
    next(err);
  }
};
module.exports = { authenticate };
