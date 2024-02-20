require("dotenv").config();
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const rateLimit = require("./middlewares/rate-limit");
const { notFound } = require("./middlewares/not-found");
const { error } = require("./middlewares/error");
const authRoute = require("./routes/auth-route");
const { authenticate } = require("./middlewares/authenticate");
const { prisma } = require("./models/prisma");
const listRoute = require("./routes/list-route");
const multer = require("multer");
const { dashboardRoute } = require("./routes/dashboard-route");
const { exicute } = require("./db");
const { registerService } = require("./services/register-service");
const { sign } = require("./services/jwt-service");

const app = express();

app.use(express.json());
app.use(cors());
app.use(morgan("dev"));
app.use(rateLimit);

//
app.use("/", authRoute);
app.use("/list", listRoute);
app.get("/category", authenticate, async (req, res, next) => {
  const list = await prisma.category.findMany();
  res.status(200).json({ list });
});
app.use("/dashboard", authenticate, dashboardRoute);
//

app.post("/loginWithFace", async (req, res, next) => {
  try {
    const sql = `select id from users where facebook_id = ?`;
    const value = [req.body.id];
    const user = await exicute(sql, value);
    if (user.length == 0) {
      const result = await exicute(
        `insert into users (facebook_id) value (?)`,
        [req.body.id]
      );

      console.log(result);
      const playload = { userId: result.insertId };
      const token = sign(playload);

      res.status(200).json({ message: "register success", token });
      return;
    }
    console.log(user);
    const playload = { userId: user[0].id };
    const token = sign(playload);

    res.status(200).json({ message: "register success", token });
    // res.status(200).json({ message: "มีแล้ว" });
  } catch (err) {
    next(err);
  }
});

app.use(notFound);
app.use(error);

const port = process.env.PORT;
app.listen(port, () => {
  console.log("server is running on port", port);
});
