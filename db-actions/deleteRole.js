// pool to execute the mysql queries
const pool = require("../db/pool");
require('console.table');

// removes a role from the database
const deleteRole = async (id) => {
    await pool.query("DELETE FROM role WHERE id = ?", [id]);
    console.log(`Role romoved from database`);
}

module.exports = deleteRole;