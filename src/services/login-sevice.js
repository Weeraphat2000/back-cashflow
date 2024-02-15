const { prisma } = require("../models/prisma");

exports.findUser = (username) =>
  prisma.user.findFirst({
    where: {
      OR: [{ email: username }, { mobile: username }],
    },
  });
