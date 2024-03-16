const { exicute } = require("../db");
const { prisma } = require("../models/prisma");
const {
  createListService,
  allListService,
  listCurrentDateService,
} = require("../services/list-service");
const { createError } = require("../utils/create-error");

exports.createList = async (req, res, next) => {
  try {
    if (
      new Date(new Date().setHours(new Date().getHours() + 7)).toISOString() <
      req.body.createdAt
    ) {
      createError("ล่วงหน้าไม้ได้นะจ้ะ", 400);
    }

    if (!req.body.amount || !+req.body.amount || req.body.amount <= 0) {
      createError("amount number!", 400);
    }
    if (!req.body.categoryId || !+req.body.categoryId) {
      createError("category number!", 400);
    }

    //
    //

    const data = {
      ...req.body,
      userId: req.user.id,
      amount: +req.body.amount,
      categoryId: +req.body.categoryId,
      updatedAt: null,
    };
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
    const { offset, limit } = req.params;
    const data = await allListService(req.user.id, +offset, +limit);
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

// สรา้ง midleware มันกันเลยน่าจะดีกว่าช่ไหม
exports.editList = async (req, res, next) => {
  try {
    if (req.body.amount && !+req.body.amount) {
      createError("number!", 400);
    }
    if (req.body.categoryId && !+req.body.categoryId) {
      createError("number!", 400);
    }

    if (
      new Date(new Date().setHours(new Date().getHours() + 7)).toISOString() <
      req.body.createdAt
    ) {
      createError("ล่วงหน้าไม่ได้นะจ้ะ จากหลังบ้าน", 400);
    }

    const isOwnerList = await exicute(
      `select * from statements where id = ? and user_id = ?`,
      [+req.params.listId, req.user.id]
    );
    if (isOwnerList.length == 0) {
      createError("หาไม่เจอนะจ้ะ", 400);
    }
    // if (isOwnerList[0].user_id !== req.user.id) {
    //   createError("อย่ามายุ่งของคนอื่น", 400);
    // }

    if (
      req.body.transactionType !== "INCOME" &&
      req.body.transactionType != "EXPENSE"
    ) {
      createError("transactionType ไม่ถูก", 400);
    }

    const data = {
      ...req.body,
      userId: req.user.id,
      amount: +req.body.amount,
      categoryId: +req.body.categoryId,
      updatedAt: new Date(),
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
    const isOwnerList = await exicute(`select * from statements where id = ?`, [
      +req.params.listId,
    ]);
    if (isOwnerList[0].user_id !== req.user.id) {
      createError("อย่ามายุ่งของคนอื่น", 400);
    }

    const data = await prisma.statement.delete({
      where: { id: +req.params.listId },
    });
    res.status(200).json({ data });
  } catch (err) {
    next(err);
  }
};
