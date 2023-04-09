// pool to execute the various mysql queries
const pool = require("../db/pool");
require('console.table');

// updates the employee
const updateEmployee = async (id,first_name, last_name, role_id, manager_id) => {
    await pool.query("UPDATE employee SET first_name = ?, last_name = ?, role_id = ?, manager_id = ? WHERE id = ?", [first_name, last_name, role_id, manager_id, id]);
    console.log(`Updated Employee`);
}

module.exports = updateEmployee;