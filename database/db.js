require('dotenv').config();
const mysql = require('mysql2/promise');

mysql.createConnection({
    user: process.env.DB_USER,
    password: process.env.DB_PASS
}).then(() => console.log("Good!")).catch(err => console.log(err));