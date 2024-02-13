const { prisma } = require("../models/prisma");

exports.createList = async (req, res, next) => {
  try {
    // console.log(req.user.id);
    console.log({ ...req.body, userId: req.user.id });
    const data = await prisma.statement.create({
      data: { ...req.body, userId: req.user.id },
    });
    res.status(200).json({ message: "created", data });
  } catch (er) {
    next(er);
  }
};

exports.allList = async (req, res, next) => {
  try {
    console.log(req.user.id);
    const data = await prisma.statement.findMany({
      where: { userId: req.user.id },
      orderBy: { createdAt: "desc" },
    });
    res.status(200).json({ data });
  } catch (err) {
    next(err);
  }
};
