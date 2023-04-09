// pool to execute the various mysql queries
const pool = require("../db/pool");

// returns all the roles as an array
const getAllRoles = async () => {
    const [rows, fields] = await pool.query("SELECT * FROM role");
    return rows;   
}

module.exports = getAllRoles;