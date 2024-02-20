// const { dateFormat } = require("dateformat");
const { exicute } = require("../db");
const { prisma } = require("../models/prisma");
const {
  createListService,
  allListService,
  listCurrentDateService,
} = require("../services/list-service");
// const dateFormat = require("dateformat");

exports.createList = async (req, res, next) => {
  try {
    const data = {
      ...req.body,
      userId: req.user.id,
      amount: +req.body.amount,
      categoryId: +req.body.categoryId,
    };
    // const result = await prisma.statement.create({
    //   data,
    //   include: { category: true },
    // });
    const result = await createListService(data);

    res.status(200).json({ message: "created", data: result });
  } catch (er) {
    next(er);
  }
};

exports.allList = async (req, res, next) => {
  try {
    // const data = await prisma.statement.findMany({
    //   where: { userId: req.user.id },
    //   orderBy: { createdAt: "desc" },
    //   include: { category: true },
    // });
    const data = await allListService(req.user.id);
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
      // -17,
      7,
      0,
      0
    ); // เวลาเริ่มต้นของวันปัจจุบัน
    const todayEnd = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      currentDate.getDate(),
      // 7,
      31,
      0,
      0
    ); // เวลาสิ้นสุดของวันปัจจุบัน
    // const Currentdate = dateFormat(new Date(), "yyyy-mm-dd'T'HH:MM:ss.ms'Z'");
    // console.log(Currentdate);

    // const data = await prisma.statement.findMany({
    //   where: {
    //     AND: [
    //       { userId: req.user.id },
    //       {
    //         createdAt: {
    //           gte: todayStart,
    //           lte: todayEnd,
    //         },
    //       },
    //     ],
    //   },
    //   orderBy: { createdAt: "desc" },
    //   include: { category: true },
    // });
    const data = await listCurrentDateService(
      req.user.id,
      todayStart,
      todayEnd
    );

    const sql = `select *
                  from statements s inner join categorys c on s.category_id = c.id
                  where date(createdAt) = date(current_date()) and user_id = ?`;
    const value = [req.user.id];
    const raw = await exicute(sql, value);
    console.log("raw", raw);

    console.log("data prisma", data);
    res.status(200).json({ data });
  } catch (err) {
    next(err);
  }
};

exports.editList = async (req, res, next) => {
  try {
    const data = {
      ...req.body,
      userId: req.user.id,
      amount: +req.body.amount,
      categoryId: +req.body.categoryId,
    };
    const id = +req.params.listId;

    const newData = await prisma.statement.update({
      where: { id },
      data,
      include: { category: true },
    });
    res.status(200).json({ message: "updateed", data: newData });
  } catch (err) {
    next(err);
  }
};

exports.deleteList = async (req, res, next) => {
  try {
    const data = await prisma.statement.delete({
      where: { id: +req.params.listId },
    });
    res.status(200).json({ data });
  } catch (err) {
    next(err);
  }
};
