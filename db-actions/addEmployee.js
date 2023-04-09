// pool to execute the mysql queries
const pool = require("../db/pool");
require('console.table');

// adds an employee to the database
const addEmployee = async (first_name, last_name, role_id, manager_id) => {
    await pool.query("INSERT INTO employee(first_name, last_name, role_id, manager_id) VALUES(?,?,?,?)", [first_name, last_name, role_id, manager_id]);
    console.log(`Added Employee to the database`);
}

module.exports = addEmployee;