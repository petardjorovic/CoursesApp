const express = require('express');
const db = require("../database/config");
const router = express.Router();

router.use(['/students', '/courses','/enrollments', '/payments'], guardian);
router.use('/', require('./home-route'));
router.use('/students', require('./students-route'));
router.use('/courses', require('./courses-route'));
router.use('/enrollments', require('./enrollments-route'));
router.use('/payments', require('./payments-route'));
router.use('/auth', require('./auth-route'));



router.get("*", (req,res)=>{
    res.render("404", {title:"404 Page;"})
})


async function guardian(req,res,next){
    let admin_id = req.session.user;
    const [[user]] = await db.query(`SELECT role FROM admins WHERE admin_id = ?`, [admin_id]);
    if(user){
        if(user.role === 'user' || user.role === "user"){
            next();
        }
    }else{
        res.redirect('/');
    }
}


module.exports = router;