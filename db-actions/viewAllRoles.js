// pool to execute the various mysql queries
const pool = require("../db/pool");
require('console.table');

// query the role table and display as a table
const viewAllRoles = async () => {
    const [rows, fields] = await pool.query("SELECT role.id, role.title, department.`name`, role.salary FROM role LEFT JOIN department ON role.department_id = department.id");
    let tableRows = [];
    // print the rows
    for(let row in rows){
        tableRows.push({
            'ID': rows[row].id,
            'Role': rows[row].title,
            'Department': rows[row].name,
            'Salary': rows[row].salary,
        });
    }

    // display the table
    console.table(tableRows);
}

module.exports = viewAllRoles;