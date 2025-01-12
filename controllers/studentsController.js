const { title } = require('process');
const db = require('../database/config')

const index = async(req,res)=>{
    try {
        const [students] = await db.query(`SELECT * FROM students;`);
        res.render('students/index', {title:"Students", students})
    } catch (error) {
        console.error('Errors: ' + error);
    }
    
}

const create = (req,res)=>{
    res.render('students/create', {title:"Students"});
}

const store = async(req,res)=>{
    const { first_name, last_name, email } = req.body;
    try {
        await db.query(`INSERT INTO students (first_name, last_name, email) VALUES (?, ?, ?);`, [first_name, last_name, email]);
        res.redirect('/students')
    } catch (error) {
        console.error('Errors: ' + error);
    }
}

const show = async(req,res)=>{
    const id = req.params.id;
    try {
        const [[student]] = await db.query(`SELECT * FROM students WHERE student_id = ?`, [id]);
        const [enrollments] = await db.query(`SELECT * FROM enrollments e
                                            JOIN students s ON e.student_id = s.student_id
                                            JOIN courses c ON e.course_id = c.course_id
                                            WHERE e.student_id = ?;`, [id]);
        const [courses] = await db.query('SELECT * FROM courses');
        const [payments] = await db.query(`SELECT * FROM payments p
                                           JOIN courses c ON p.course_id = c.course_id
                                           WHERE p.student_id = ?;`, [id]);
        let filteredCourses = courses.filter(course =>{
            return !(enrollments.some(el => el.course_id === course.course_id))
        })
        res.render('students/profile', {title:"Students", student, filteredCourses, enrollments, payments});
    } catch (error) {
        console.error('Errors: ' + error);
    }
}


module.exports = {
    index, create, store, show
}