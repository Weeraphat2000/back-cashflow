const JWT = require("jsonwebtoken");
const { hash } = require("../services/hash-service");
const {
  registerService,
  checkUserDuplicate,
} = require("../services/register-service");
const { createError } = require("../utils/create-error");
const { sign } = require("../services/jwt-service");

exports.register = async (req, res, next) => {
  try {
    // req.body.birthdate = new Date(); // อย่าลืมมาจัดการเรื่องเวลานะ
    //
    req.body.password = await hash(req.body.password);
    delete req.body.confirmPassword;

    // console.log(req.body);
    const isDuplicate = await checkUserDuplicate(req.body);
    console.log(isDuplicate);
    if (isDuplicate) {
      createError("Email or mobile already in use", 400);
      // res.status(400).json({ message: "diplicate" });
      // return;
    }

    const newUser = await registerService(req.body);
    const playload = { userId: newUser.id };
    const token = sign(playload);

    res.status(200).json({ message: "register success", token, newUser });
  } catch (error) {
    next(error);
  }
};
