const { prisma } = require("../models/prisma");

exports.registerService = (data) => prisma.user.create({ data });

exports.checkUserDuplicate = (body) =>
  prisma.user.findFirst({
    where: { OR: [{ email: body.email }, { mobile: body.mobile }] },
  });

// exports.a = ()=>prisma.user.findMany({where:{id}})
