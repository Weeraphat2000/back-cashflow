const Joi = require("joi");
const { validate } = require("./validate");

const registerSchema = Joi.object({
  firstName: Joi.string().required().trim().messages({
    "string.empty": "First name is require",
    "any.required": "First name is require",
  }),
  lastName: Joi.string().required().trim().messages({
    "string.empty": "Last name is require",
    "any.required": "Last name is require",
  }),
  email: Joi.string().required().trim().email({ tlds: true }).messages({
    "string.empty": "Email is require",
    "any.required": "Email is require",
  }),
  mobile: Joi.string()
    .pattern(/^[0]{1}[0-9]{9}$/)
    .required()
    .trim()
    .messages({
      "string.empty": "Mobile is require",
      "any.required": "Mobile is require",
      "string.pattern.base": "Mobile is worng",
    }),
  password: Joi.string()
    .pattern(/^(?=.*[A-Za-z])[A-Za-z0-9]{6,}$/)
    .trim()
    .required()
    .messages({
      "string.empty": "Password is require",
      "string.pattern.base":
        "Password must be at least 6 characters with at least 1 English character",
      "any.required": "Password is require",
    }),
  confirmPassword: Joi.string().required().valid(Joi.ref("password")).messages({
    "any.required": "Confirm password is require",
    "any.only": "password and confirm password does't match",
    "string.empty": "Confirm password is require",
  }),
  // birthdate: Joi.required(),
  gender: Joi.string().required(),
});

exports.validateRegister = validate(registerSchema);
