const { prisma } = require("../models/prisma");
const { sign } = require("../services/jwt-service");
const { createError } = require("../utils/create-error");
const bcrypt = require("bcryptjs");

exports.login = async (req, res, next) => {
  try {
    const user = await prisma.user.findFirst({
      where: {
        OR: [{ email: req.body.username }, { mobile: req.body.username }],
      },
    });
    if (!user) {
      createError("username or password invalid", 201);
    }
    const data = await bcrypt.compare(req.body.password, user.password);
    if (!data) {
      createError("username or password invalid", 201);
    }

    const playload = { userId: user.id };
    const token = sign(playload);
    res.status(200).json({ user, token });
  } catch (error) {
    next(error);
  }
};

exports.getMe = async (req, res, next) => {
  try {
    console.log(req.user);
    res.status(200).json({ user: req.user });
  } catch (error) {
    next(error);
  }
};
