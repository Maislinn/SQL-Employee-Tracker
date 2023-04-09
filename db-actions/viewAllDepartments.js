// pool to execute the various mysql queries
const pool = require("../db/pool");
require('console.table');

// query the department table and display as a table
const viewAllDepartments = async () => {
    const [rows, fields] = await pool.query("SELECT * FROM department");
    let tableRows = [];
    // print the rows
    for(let row in rows){
        tableRows.push({
            'Departments': rows[row].name,
        });
    }

    // display the table
    console.table(tableRows);
}

module.exports = viewAllDepartments;