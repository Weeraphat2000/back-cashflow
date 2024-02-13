exports.createError = (message, status) => {
  const error = new Error(message);
  error.errorCode = status;
  throw error;
};
