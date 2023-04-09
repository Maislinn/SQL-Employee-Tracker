// pool to execute the various mysql queries
const pool = require("../db/pool");

// returns all the departments as an array
const getAllDepartments = async () => {
    const [rows, fields] = await pool.query("SELECT * FROM department");
    return rows;   
}

module.exports = getAllDepartments;