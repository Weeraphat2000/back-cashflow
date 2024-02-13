const { ValidationError } = require("joi");

exports.error = (error, req, res, next) => {
  if (error instanceof ValidationError) {
    error.errorCode = 400;
  }
  // console.log("*");
  // console.log(error.message);
  // console.log("*");

  res.status(error.errorCode || 500).json({ message: error.message });
};
