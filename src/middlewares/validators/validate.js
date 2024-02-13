const Joi = require("joi");
exports.validate = (shcema) => (req, res, next) => {
  const { value, error } = shcema.validate(req.body);
  if (error) {
    // จะเป็น ValidationError ของ joi
    // ถ้า error จะให้ error
    throw error;
  }
  req.body = value; // ถ้าทำผ่านจะได้เลย
  next(); // และจะให้ไป middleware ตัวถัดไป
};
