const { Router } = require("express");
const {
  currentDate,
  currentMonth,
  currentMonthLine,
  currentYear,
  currentYearBar,
  searchDate,
  searchDateLine,
} = require("../controllers/dashboardComtroller");

const dashboardRoute = Router();
dashboardRoute.get("/current-date", currentDate);
dashboardRoute.get("/current-month", currentMonth);
dashboardRoute.get("/current-month-line", currentMonthLine);

dashboardRoute.get("/current-year", currentYear);
dashboardRoute.get("/current-yaer-bar", currentYearBar);
dashboardRoute.get("/search/:start/:end", searchDate);

dashboardRoute.get("/search-line/:start/:end", searchDateLine);

module.exports = { dashboardRoute };
