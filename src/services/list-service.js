const { prisma } = require("../models/prisma");

exports.createListService = (data) =>
  prisma.statement.create({
    data,
    include: { category: true },
  });

exports.allListService = (id) =>
  prisma.statement.findMany({
    where: { userId: id },
    orderBy: { createdAt: "desc" },
    include: { category: true },
  });

exports.listCurrentDateService = (id, todayStart, todayEnd) =>
  prisma.statement.findMany({
    where: {
      AND: [
        { userId: id },
        {
          createdAt: {
            gte: todayStart,
            lte: todayEnd,
          },
        },
      ],
    },
    orderBy: { createdAt: "desc" },
    include: { category: true },
  });
