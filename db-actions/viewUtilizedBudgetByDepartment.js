// pool to execute the various mysql queries
const pool = require("../db/pool");
require('console.table');

// query the employee table and display as a table
const viewUtilizedBudgetByDepartment = async () => {
    const [rows, fields] = await pool.query("SELECT d.`name`, SUM(r.salary) as `salary` FROM employee e LEFT JOIN `role` r ON e.role_id = r.id LEFT JOIN department d ON r.department_id = d.id GROUP BY d.id ORDER BY 2 DESC");
    let tableRows = [];
    // print the rows
    for(let row in rows){
        tableRows.push({
            'Department': rows[row].name,
            'Utilized Budget': rows[row].salary
        });
    }

    // display the table
    console.table(tableRows);
}

module.exports = viewUtilizedBudgetByDepartment;