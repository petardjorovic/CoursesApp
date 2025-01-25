const db = require("../database/config");
const bcrypt = require("bcryptjs");
const sendMail = require("../libs/sendMail");
const { APP_BASE_URL } = require("../libs/config");

const loginPage = async (req, res) => {
  const msg = req.session.errorMsg;

  // Ukloni poruku iz sesije nakon što je prikažeš
  delete req.session.errorMsg;
  res.render("auth/login", { title: "Login", msg });
};

const registerPage = async (req, res) => {
  const msg = req.session.errorMsg;

  // Ukloni poruku iz sesije nakon što je prikažeš
  delete req.session.errorMsg;
  res.render("auth/register", { title: "Register", msg });
};

const register = async (req, res,next) => {
    try {
        const SALT = 10;
        nameRegex = /^[A-Z][a-zA-Z-' ]{1,59}$/;
        const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        const { first_name, last_name, email, password, confirm_password } = req.body;
        if (!nameRegex.test(first_name) || !nameRegex.test(last_name)) {
          req.session.errorMsg = "Wrong format of First name or Last name!";
          res.redirect("/auth/register");
        } else {
          if (!emailRegex.test(email)) {
            req.session.errorMsg = "Wrong format of email!";
            res.redirect("/auth/register");
          } else {
            if (password.trim().length < 8) {
              req.session.errorMsg = "Password must be at least 8 characters long";
              res.redirect("/auth/register");
            } else {
              if (password.trim() !== confirm_password.trim()) {
                req.session.errorMsg =
                  "Password and Confirm Password must be the same!";
                res.redirect("/auth/register");
              } else {
                bcrypt.hash(password, SALT, async(err,hash)=>{
                    try {
                        if(err){
                            throw new Error(err.message)
                        }else{
                          const registeredUser = await db.query(`INSERT INTO admins (first_name, last_name, email, password) VALUES (?, ?, ?, ?);`, [first_name, last_name, email, hash]);
                          let activationLink = `${APP_BASE_URL}/auth/activate/${registeredUser[0].insertId}`;
                          let info = await sendMail(email, activationLink);
                          console.log(info)
                          res.redirect("/");
                        }
                    } catch (error) {
                        next(error.message)
                    }
                  
                })
              }
            }
          }
        }
    } catch (error) {
        console.log(error);
        next(error.message)
    }

};

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const [[user]] = await db.query(`SELECT * FROM admins WHERE email = ? AND isActive = ?`, [
      email, 1
    ]);
    if (user) {
        const checkPassword = await bcrypt.compare(password, user.password);
      if (checkPassword) {   // user.password === password
        req.session.user = user.admin_id;
        res.redirect("/");
      } else {
        req.session.errorMsg = "Wrong credentials!";
        res.redirect("/auth/login");
      }
    } else {
      req.session.errorMsg = "There isn't such a user or account is not activated!";
      res.redirect("/auth/login");
    }
  } catch (error) {
    console.error("Errors: " + error);
  }
};

const logout = (req, res) => {
  req.session.destroy();
  res.redirect("/");
};

const activate = async(req,res,next)=>{
  try {
    let id = req.params.id;
    const user = await db.query(`UPDATE admins SET isActive = ? WHERE admin_id = ? AND isActive = 0;`,[1, id]);
    res.redirect("/auth/login");
  } catch (error) {
    next(new Error(error.message));
  }
}

module.exports = {
  loginPage,
  login,
  logout,
  registerPage,
  register,
  activate
};
