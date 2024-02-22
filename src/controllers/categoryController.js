const { prisma } = require("../models/prisma");

exports.category = async (req, res, next) => {
  try {
    const list = await prisma.category.findMany();
    res.status(200).json({ list });
  } catch (err) {
    next(err);
  }
};
