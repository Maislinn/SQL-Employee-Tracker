// pool to execute the mysql queries
const pool = require("../db/pool");
require('console.table');

// removes a department from the database
const deleteDepartment = async (id) => {
    await pool.query("DELETE FROM department WHERE id = ?", [id]);
    console.log(`Department romoved from database`);
}

module.exports = deleteDepartment;