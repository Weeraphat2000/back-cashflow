const { Router } = require("express");
const { authenticate } = require("../middlewares/authenticate");
const {
  createList,
  allList,
  listCurrentDate,
  editList,
  deleteList,
} = require("../controllers/listController");

const listRoute = Router();
listRoute.get("/", authenticate, allList);
listRoute.get("/current", authenticate, listCurrentDate);
listRoute.post("/", authenticate, createList);
listRoute.patch("/:listId", authenticate, editList);
listRoute.delete("/:listId", authenticate, deleteList);

module.exports = listRoute;
