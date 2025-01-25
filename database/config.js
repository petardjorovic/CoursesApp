const mysql2 = require('mysql2');
const { DB_HOST,DB_USER,DB_PASS,DB_NAME } = require('../libs/config');

const db = mysql2.createPool({
    host : DB_HOST,
    user : DB_USER,
    password : DB_PASS,
    database : DB_NAME
}).promise();

module.exports = db;