const { Router } = require("express");
const { register } = require("../controllers/register");
const {
  validateRegister,
} = require("../middlewares/validators/validate-register");
const { login, getMe } = require("../controllers/login");
const { authenticate } = require("../middlewares/authenticate");

const authRoute = Router();
authRoute.post("/register", validateRegister, register);
authRoute.post("/login", login);
authRoute.get("/me", authenticate, getMe);

module.exports = authRoute;
