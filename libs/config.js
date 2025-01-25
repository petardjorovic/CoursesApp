require("dotenv").config();

let SESSION_SECRET = process.env.SESSION_SECRET;
let PORT = process.env.PORT;
let DB_HOST = process.env.DB_HOST;
let DB_USER = process.env.DB_USER;
let DB_PASS = process.env.DB_PASS;
let DB_NAME = process.env.DB_NAME;
let USER_MAIL = process.env.USER_MAIL;
let USER_MAIL_PASS = process.env.USER_MAIL_PASS;
let APP_BASE_URL = process.env.NODE_ENV === "production" ? "" : `http://localhost:${PORT}`;

module.exports = {
    SESSION_SECRET,
    PORT,
    DB_HOST,
    DB_USER,
    DB_PASS,
    DB_NAME,
    USER_MAIL,
    USER_MAIL_PASS,
    APP_BASE_URL
}