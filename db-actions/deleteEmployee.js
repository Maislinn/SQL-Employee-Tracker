// pool to execute the mysql queries
const pool = require("../db/pool");
require('console.table');

// removes an employee from the database
const deleteEmployee = async (id) => {
    await pool.query("DELETE FROM employee WHERE id = ?", [id]);
    console.log(`Employee romoved from database`);
}

module.exports = deleteEmployee;