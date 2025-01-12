const db = require("../database/config");

const index = async (req, res) => {
  try {
    const [[sum]] = await db.query(`SELECT SUM(amount) AS total FROM payments`);
    const [payments] = await db.query(`SELECT * FROM payments p
                                       JOIN students s ON p.student_id = s.student_id
                                       JOIN courses c ON p.course_id = c.course_id;`);
    res.render('payments/index', {title:"Payments", payments, sum});
  } catch (error) {
    console.error("Errors: " + error);
  }
};

const store = async (req, res) => {
  const { course_id, student_id, amount } = req.body;
  try {
    await db.query(
      `INSERT INTO payments (course_id, student_id, amount) VALUES (?, ?, ?);`,
      [course_id, student_id, amount]
    );
    res.redirect("/students/profile/" + student_id);
  } catch (error) {
    console.error("Errors: " + error);
  }
};

module.exports = {
  index,
  store,
};
