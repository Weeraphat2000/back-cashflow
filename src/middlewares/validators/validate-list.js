const Joi = require("joi");
const { validate } = require("./validate");

const registerSchema = Joi.object({
  amount: Joi.string()
    .required()
    .trim()
    .pattern(/[0-9]{1,}$/)
    .messages({
      "string.empty": "Amount is require",
      "any.required": "Amount is require",
    }),
  categoryId: Joi.string()
    .required()
    .pattern(/[0-9]{1,}$/)
    .messages({
      "string.empty": "Category is require",
      "any.required": "Category is require",
    }),
});

exports.validateCreateList = validate(registerSchema);
