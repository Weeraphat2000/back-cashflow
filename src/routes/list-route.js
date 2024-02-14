const { Router } = require("express");
const { authenticate } = require("../middlewares/authenticate");
const {
  createList,
  allList,
  listCurrentDate,
} = require("../controllers/listController");

const listRoute = Router();
listRoute.get("/", authenticate, allList);
listRoute.get("/current", authenticate, listCurrentDate);
listRoute.post("/", authenticate, createList);
listRoute.patch("/:listId", authenticate);
listRoute.delete("/:listId", authenticate);

module.exports = listRoute;
