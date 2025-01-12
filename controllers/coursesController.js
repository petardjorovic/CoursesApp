const db = require('../database/config');

const index = async(req,res)=>{
    try {
        const [courses] = await db.query(`SELECT * FROM courses`);
        res.render('courses/index', {title:"Courses", courses})
    } catch (error) {
        console.error('Errors: ' + error)
    }
}


module.exports = {
    index
}