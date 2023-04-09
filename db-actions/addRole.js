// pool to execute the mysql queries
const pool = require("../db/pool");
require('console.table');

// adds a role to the database
const addRole = async (title, salary, department_id) => {
    await pool.query("INSERT INTO role(`title`, `salary`, `department_id`) VALUES(?,?,?)", [title, salary, department_id]);
    console.log(`Added Role to the database`);
}

module.exports = addRole;