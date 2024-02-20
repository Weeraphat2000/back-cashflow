const { exicute } = require("../db");
const { prisma } = require("../models/prisma");

exports.currentDate = async (req, res, next) => {
  const sql = `select sum(amount) sum, category_name
                from statements s inner join categorys c on s.category_id = c.id
                where date(createdAt) = date(current_date()) and user_id = ? 
                group by category_name;`;
  const value = [req.user.id];
  const data = await exicute(sql, value);
  res.status(200).json({ data });
};

exports.currentMonth = async (req, res, next) => {
  const sql = `select sum(amount) sum, category_name
                from statements s inner join categorys c on s.category_id = c.id
                where month(createdAt) = month(current_date()) and user_id = ?
                group by category_id;`;
  const value = [req.user.id];
  const data = await exicute(sql, value);
  res.status(200).json({ data });
};

exports.currentMonthLine = async (req, res, next) => {
  const sql = `select sum(amount) sum, TransactionType, date(createdAt) as date
                from statements s inner join categorys c on s.category_id = c.id
                where month(createdAt) = month(CURRENT_DATE()) and user_id = ? 
                group by date(createdAt), TransactionType
                order by date(createdAt);`;
  const value = [req.user.id];
  const data = await exicute(sql, value);

  const x = data.map((item) => {
    // สูตรพี่ฟี่ย์
    item.date.setHours(item.date.getHours() + 7);
    return {
      sum: item.sum,
      TransactionType: item.TransactionType,
      date: item.date,
    };
  });

  res.status(200).json({ data: x });
};

exports.currentYear = async (req, res, next) => {
  const sql = `select sum(amount) sum, category_name
                from statements s inner join categorys c on s.category_id = c.id
                where year(createdAt) = year(current_date()) and user_id = ? 
                group by category_name;`;
  const value = [req.user.id];
  const data = await exicute(sql, value);

  res.status(200).json({ data });
};

exports.currentYearBar = async (req, res, next) => {
  const sql = `select sum(amount) sum, TransactionType, month(createdAt) as month
                from statements s inner join categorys c on s.category_id = c.id
                where year(createdAt) = year(current_date()) and user_id = ?
                group by month(createdAt), TransactionType
                order by month(createdAt) asc;`;
  // select sum(amount) sum, TransactionType, monthname(createdAt) as date
  //     from statements s inner join categorys c on s.category_id = c.id
  //     where year(createdAt) = year(current_date()) and user_id = 36
  //     group by TransactionType, monthname(createdAt)
  //     order by monthname(createdAt)
  const value = [req.user.id];
  const data = await exicute(sql, value);
  res.status(200).json({ data });
};

exports.searchDate = async (req, res, next) => {
  const sql = `select sum(amount) sum, category_name
                from statements s inner join categorys c on s.category_id = c.id
                where user_id = ? and createdAt between ? and ? 
                group by category_name;`;
  const value = [req.user.id, req.params.start, req.params.end];
  const data = await exicute(sql, value);
  res.status(200).json({ data });
};
