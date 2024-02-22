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
const { loginWithFB } = require("./controllers/fbContronller");
const { category } = require("./controllers/categoryController");

const app = express();

app.use(express.json());
app.use(cors());
app.use(morgan("dev"));
app.use(rateLimit);

//
app.use("/", authRoute);
app.use("/list", listRoute);
app.get("/category", authenticate, category);
app.use("/dashboard", authenticate, dashboardRoute);
//

app.post("/loginWithFace", loginWithFB);

app.use(notFound);
app.use(error);

const port = process.env.PORT;
app.listen(port, () => {
  console.log("server is running on port", port);
});
