const db = require('../database/config');

const index = (req,res)=>{
    res.render('enrollments/index', {title:"Enrollments"})
}

const store = async(req,res)=>{
    const { student_id, course_id } = req.body;
    try {
        await db.query(`INSERT INTO enrollments (student_id, course_id) VALUES (?, ?);`, [student_id, course_id]);
        res.redirect('/students/profile/' + student_id);
    } catch (error) {
        console.error('Errors: ' + error);
    }
}


module.exports = {
    index, store
}