require('dotenv').config();
const mysql = require('mysql2/promise');

module.exports = mysql.createConnection({
     user: 'partha',
     password: 'mydbtestpw',
     database: 'discorddb'
});