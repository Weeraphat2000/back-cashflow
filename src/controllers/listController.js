const { prisma } = require("../models/prisma");
// const dateFormat = require("dateformat");

exports.createList = async (req, res, next) => {
  try {
    // console.log(req.user.id);
    const data = {
      ...req.body,
      userId: req.user.id,
      amount: +req.body.amount,
      categoryId: +req.body.categoryId,
    };
    console.log(data);
    const result = await prisma.statement.create({ data });

    res.status(200).json({ message: "created" });
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

exports.listCurrentDate = async (req, res, next) => {
  try {
    const currentDate = new Date(new Date().getTime() + 7 * 60 * 60 * 1000); // วันปัจจุบัน
    const todayStart = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      currentDate.getDate(),
      7,
      0,
      0
    ); // เวลาเริ่มต้นของวันปัจจุบัน
    const todayEnd = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      currentDate.getDate(),
      31,
      0,
      0
    ); // เวลาสิ้นสุดของวันปัจจุบัน

    const data = await prisma.statement.findMany({
      where: {
        AND: [
          { userId: req.user.id },
          {
            createdAt: {
              gte: todayStart,
              lte: todayEnd,
            },
          },
        ],
      },
      orderBy: { createdAt: "desc" },
    });

    res.status(200).json({ data });
  } catch (err) {
    next(err);
  }
};
