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
  //   const sql = `select sum(amount) sum, TransactionType, monthname(createdAt) as date
  //                     from statements s inner join categorys c on s.category_id = c.id
  //                     where year(createdAt) = year(current_date()) and user_id = ?
  //                     group by monthname(createdAt), TransactionType,category_name
  //                     order by monthname(createdAt)`;
  const value = [req.user.id];
  const data = await exicute(sql, value);

  res.status(200).json({ data });
};
