exports.notFound = (req, res, next) => {
  res.status(400).json({ message: "resource was not found on this server" });
};
