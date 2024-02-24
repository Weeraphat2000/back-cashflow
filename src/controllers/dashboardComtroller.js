const { exicute } = require("../db");
// const datea = require("dateformat");

exports.currentDate = async (req, res, next) => {
  try {
    const sql = `select sum(amount) sum, category_name
                from statements s inner join categorys c on s.category_id = c.id
                where date(createdAt) = date(current_date()) and user_id = ? 
                group by category_name;`;
    const value = [req.user.id];
    const data = await exicute(sql, value);
    res.status(200).json({ data });
  } catch (err) {
    next(err);
  }
};

exports.currentMonth = async (req, res, next) => {
  try {
    const sql = `select sum(amount) sum, category_name
                from statements s inner join categorys c on s.category_id = c.id
                where month(createdAt) = month(current_date()) and user_id = ?
                group by category_id;`;
    const value = [req.user.id];
    const data = await exicute(sql, value);
    res.status(200).json({ data });
  } catch (err) {
    next(err);
  }
};

exports.currentMonthLine = async (req, res, next) => {
  try {
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
  } catch (err) {
    next(err);
  }
};

exports.currentYear = async (req, res, next) => {
  try {
    const sql = `select sum(amount) sum, category_name
                    from statements s inner join categorys c on s.category_id = c.id
                    where year(createdAt) = year(current_date()) and user_id = ? 
                    group by category_name;`;
    const value = [req.user.id];
    const data = await exicute(sql, value);

    res.status(200).json({ data });
  } catch (err) {
    next(err);
  }
};

exports.currentYearBar = async (req, res, next) => {
  try {
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
  } catch (err) {
    next(err);
  }
};

exports.searchDate = async (req, res, next) => {
  try {
    const sql = `select sum(amount) sum, category_name
                from statements s inner join categorys c on s.category_id = c.id
                where user_id = ? and createdAt between ? and ? 
                group by category_name;`;
    const value = [req.user.id, req.params.start, req.params.end];
    const data = await exicute(sql, value);
    res.status(200).json({ data });
  } catch (err) {
    next(err);
  }
};

exports.searchDateLine = async (req, res, next) => {
  try {
    // req.params.start = req.params.start + "T00:00:00.000Z";
    // req.params.end = (
    //   "" +
    //   new Date(
    //     new Date().setDate(new Date(req.params.end).getDate() + 1)
    //   ).toISOString()
    // ).slice(0, 10);
    // console.log(req.params.start);
    // console.log(new Date(req.params.end).getDate() + 1);
    req.params.end = req.params.end + "T23:59:59.00Z";

    // const xx = (
    //   "" +
    //   new Date(
    //     new Date().setDate(new Date(req.params.end).getDate() + 1)
    //   ).toISOString()
    // ).slice(0, 10);

    // console.log(
    //   (
    //     "" +
    //     new Date(
    //       new Date().setDate(new Date(req.params.end).getDate() + 1)
    //     ).toISOString()
    //   ).slice(0, 10)
    // );
    // console.log(xx);
    console.log(req.params.end);
    console.log(req.params.start);

    // console.log(req.params.end);
    const sql = `select sum(amount) sum, TransactionType, date(createdAt) as date
                    from statements s inner join categorys c on s.category_id = c.id
                    where user_id = ? and createdAt between ? and ?
                    group by TransactionType, date(createdAt)
                    order by date(createdAt) asc;`;
    const value = [req.user.id, req.params.start, req.params.end];
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
  } catch (err) {
    next(err);
  }
};
