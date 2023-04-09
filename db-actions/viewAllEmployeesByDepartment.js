// pool to execute the various mysql queries
const pool = require("../db/pool");
require('console.table');

// query the employee table and display as a table
const viewAllEmployeesByDepartment = async () => {
    const [rows, fields] = await pool.query("SELECT e.id, e.first_name, e.last_name, r.title, d.`name`, r.salary, CONCAT(m.first_name, ' ', m.last_name) AS manager FROM employee e LEFT JOIN role r ON e.role_id = r.id LEFT JOIN department d ON r.department_id = d.id LEFT JOIN employee m ON e.manager_id = m.id ORDER BY r.department_id");
    let tableRows = [];
    // print the rows
    for(let row in rows){
        tableRows.push({
            'ID': rows[row].id,
            'Department': rows[row].name,
            'First Name': rows[row].first_name,
            'Last Name': rows[row].last_name,
            'Role': rows[row].title,
            'Salary': rows[row].salary,
            'Manager': rows[row].manager,
        });
    }

    // display the table
    console.table(tableRows);
}

module.exports = viewAllEmployeesByDepartment;