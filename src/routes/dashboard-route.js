const { Router } = require("express");
const {
  currentDate,
  currentMonth,
  currentMonthLine,
} = require("../controllers/dashboardComtroller");

const dashboardRoute = Router();
dashboardRoute.get("/current-date", currentDate);
dashboardRoute.get("/current-month", currentMonth);
dashboardRoute.get("/current-month-line", currentMonthLine);

module.exports = { dashboardRoute };
