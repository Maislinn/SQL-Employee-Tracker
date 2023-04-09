const mysql = require("mysql2");

const pool = mysql.createPool({
  host:'localhost', 
  user: 'root', 
  password: 'rootpassword',
  database: 'EmployeeTracker'
});

module.exports = pool.promise();