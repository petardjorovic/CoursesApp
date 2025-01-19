const express = require('express');
const session = require('express-session');
const db = require("./database/config");


const app = express();
const isProduction = process.env.NODE_ENV === 'production';

app.set('view engine', 'ejs');
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
        secure: isProduction,
        maxAge: 60000   // jedan minut traje sesija
    } 
}));


// koriscenje globalne promenljive
app.use(async(req,res,next)=>{
    let admin_id = req.session.user;
    const [[user]] = await db.query(`SELECT admin_id, email FROM admins WHERE admin_id = ?`, [admin_id]);
    if(user){
        res.locals.user = {id: admin_id, email: user.email};
    }else{
        res.locals.user = "";
    }
    next();
});
app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/node_modules/bootstrap/dist'));
app.use(express.static(__dirname + '/node_modules/bootstrap-icons/font'));
app.use(express.urlencoded({extended:true}));
app.use(express.json());



app.use(require('./routes'));

app.use((err,req,res,next)=>{
    if(err){
        res.render("error_page", {title: "Error Page",errorMsg:err, route: req.headers.referer});
    }
})

app.listen(process.env.PORT, ()=>{
    console.log('Listening on PORT ' + process.env.PORT + '.....')
})