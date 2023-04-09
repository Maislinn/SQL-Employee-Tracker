// pool to execute the various mysql queries
const pool = require("../db/pool");

// returns a single employee by name
const getEmployeeByName = async (first_name, last_name) => {
    const [rows, fields] = await pool.query("SELECT * FROM employee WHERE first_name = ? AND last_name = ? LIMIT 1", [first_name, last_name]);
    return rows.length > 0 ? rows[0] : null;   
}

module.exports = getEmployeeByName;