const express = require('express');
const session = require('express-session');

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
app.use((req,res,next)=>{
    res.locals.user = req.session.user;
    next();
});
app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/node_modules/bootstrap/dist'));
app.use(express.static(__dirname + '/node_modules/bootstrap-icons/font'));
app.use(express.urlencoded({extended:true}));
app.use(express.json());



app.use(require('./routes'));

app.listen(process.env.PORT, ()=>{
    console.log('Listening on PORT ' + process.env.PORT + '.....')
})