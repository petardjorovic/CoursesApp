const db = require('../database/config');

const index = async(req,res)=>{
    const msg = req.session.errorMsg;

    // Ukloni poruku iz sesije nakon što je prikažeš
    delete req.session.errorMsg;
    res.render('auth/index', {title:"Login", msg});
}

const login = async(req,res)=>{
    const { email, password } = req.body;
    try {
        const [[user]] = await db.query(`SELECT * FROM admins WHERE email = ?`,[email]);
        if(user){
            if(user.password === password){
                req.session.user = user;
                res.redirect('/');
            }else{
                req.session.errorMsg = 'Wrong password!';
                res.redirect('/auth/login');
            }
        }else{
            req.session.errorMsg = "There isn't such a user!";
            res.redirect('/auth/login');
        }
    } catch (error) {
        console.error('Errors: ' + error);
    }
}

const logout = (req,res)=>{
    req.session.destroy();
    res.redirect('/');
}


module.exports = {
    index, login, logout
}