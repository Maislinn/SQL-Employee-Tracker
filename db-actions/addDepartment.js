// pool to execute the various mysql queries
const pool = require("../db/pool");
require('console.table');

// adds a department to the database
const addDepartment = async (name) => {
    await pool.query("INSERT INTO department(`name`) VALUES(?)", [name]);
    console.log(`Added ${name} to the database`);
}

module.exports = addDepartment;