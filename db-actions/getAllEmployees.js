// pool to execute the various mysql queries
const pool = require("../db/pool");

// returns all the employees as an array
const getAllEmployees = async () => {
    const [rows, fields] = await pool.query("SELECT * FROM employee");
    return rows;   
}

module.exports = getAllEmployees;