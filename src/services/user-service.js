const { prisma } = require("../models/prisma");

exports.findUserById = (id) =>
  prisma.user.findUnique({
    where: { id },
  });
