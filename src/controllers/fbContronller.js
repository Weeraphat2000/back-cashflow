const { exicute } = require("../db");
const { sign } = require("../services/jwt-service");

exports.loginWithFB = async (req, res, next) => {
  try {
    const sql = `select id from users where facebook_id = ?`;
    const value = [req.body.id];
    const user = await exicute(sql, value);
    if (user.length == 0) {
      const result = await exicute(
        `insert into users (facebook_id) value (?)`,
        [req.body.id]
      );

      //   console.log(result);
      const playload = { userId: result.insertId };
      const token = sign(playload);

      res.status(200).json({ message: "register success", token });
      return;
    }
    // console.log(user);
    const playload = { userId: user[0].id };
    const token = sign(playload);

    res.status(200).json({ message: "register success", token });
  } catch (err) {
    next(err);
  }
};
