const inquirer = require("inquirer");

const viewAllDepartments = require("../db-actions/viewAllDepartments");
const viewAllEmployees = require("../db-actions/viewAllEmployees");
const viewAllRoles = require("../db-actions/viewAllRoles");
const viewAllEmployeesByDepartment = require("../db-actions/viewAllEmployeesByDepartment");
const viewAllEmployeesByManager = require("../db-actions/viewAllEmployeesByManager");

const allDepartments = require("../db-actions/getAllDepartments");
const allRoles = require("../db-actions/getAllRoles");
const allEmployees = require("../db-actions/getAllEmployees");
const employeeByName = require("../db-actions/getEmployeeByName");

const addDepartment = require("../db-actions/addDepartment");
const addRole = require("../db-actions/addRole");
const addEmployee = require("../db-actions/addEmployee");

const updateEmployee = require("../db-actions/updateEmployee");

const deleteDepartment = require("../db-actions/deleteDepartment");
const deleteRole = require("../db-actions/deleteRole");
const deleteEmployee = require("../db-actions/deleteEmployee");
const viewUtilizedBudgetByDepartment = require("../db-actions/viewUtilizedBudgetByDepartment");


//view all
const handleMenu = (answers) => {
    // view all the departments
    if(answers.action === "View All Departments"){
        viewAllDepartments()
        .then(() => {
            mainMenu();
        });
    }

    // view all the positions/roles
    else if(answers.action === "View All Roles"){
        viewAllRoles()
        .then(() => {
            mainMenu();
        });
    }

    // view all the employees
    else if(answers.action === "View All Employees"){
        viewAllEmployees()
        .then(() => {
            mainMenu();
        });
    }

  //add
    else if(answers.action === "Add A Department"){
        inquirer.prompt([
            {
                name: "department",
                message: "What is the name of the department?",
            }
        ])
        .then(async (answers) => {
            // add the department
            await addDepartment(answers.department);
        })
        .then(() => {
            mainMenu();
        })
        .catch(error => {
            console.log(error);
        });
    }

    // add a role
    else if(answers.action === "Add A Role"){
        allDepartments()
        .then(departments => {
            departmentOptions = [];

            for(let i in departments){
                departmentOptions.push(departments[i].name);
            }

            inquirer.prompt([
                {
                    name: "title",
                    message: "What is the role?",
                },

                {
                    name: "salary",
                    message: "What is the salary?",
                    type: "number"
                },

                {
                    name: "department",
                    message: "What is the department?",
                    type: "list",
                    choices: departmentOptions,
                }
            ])
            .then(async (answers) => {
                let department_id;

                // determine the department id
                for(let i in departments){
                    if(departments[i].name === answers.department){
                        department_id = departments[i].id;
                    }

                }
                // add the department
                await addRole(answers.title, answers.salary, department_id);
            })
            .then(() => {
                mainMenu();
            })
            .catch(error => {
                console.log(error);
            });
        });

    }

    // add an employee
    else if(answers.action === "Add An Employee"){
        allRoles()
        .then(roles => {
            allEmployees()
            .then(employees => {
                roleChoices = [];
                employeeChoices = ["None"];

                for(let i in roles){
                    roleChoices.push(roles[i].title);
                }

                for(let i in employees){
                    employeeChoices.push(employees[i].first_name + " " + employees[i].last_name);
                }

                inquirer.prompt([
                    {
                        name: "first_name",
                        message: "Enter in first name",
                    },

                    {
                        name: "last_name",
                        message: "Enter in the last name",
                    },

                    {
                        name: "role",
                        message: "Enter in the position/role",
                        type: "list",
                        choices: roleChoices,
                    },

                    {
                        name: "manager",
                        message: "Assign a manager",
                        type: "list",
                        choices: employeeChoices,
                    }
                ])
                .then(async (answers) => {
                    let role_id;
                    let manager_id = null;

                    // determine the role id
                    for(let i in roles){
                        if(roles[i].title === answers.role){
                            role_id = roles[i].id;
                        }

                    }

                    // determine the manager id
                    for(let i in employees){
                        if((employees[i].first_name + " " + employees[i].last_name)  === answers.manager){
                            manager_id = employees[i].id;
                        }

                    }

                    // add the department
                    await addEmployee(answers.first_name, answers.last_name, role_id, manager_id);
                })
                .then(() => {
                    mainMenu();
                })
                .catch(error => {
                    console.log(error);
                });
            })
        });
    }

    // updates
    else if(answers.action === "Update An Exsisting Employee"){
        allRoles()
        .then(roles => {
            allEmployees()
            .then(employees => {
                roleChoices = [];
                employeeChoices = ["None"];

                for(let i in roles){
                    roleChoices.push(roles[i].title);
                }

                for(let i in employees){
                    employeeChoices.push(employees[i].first_name + " " + employees[i].last_name);
                }

                inquirer.prompt([
                    {
                        name: "first_name",
                        message: "Enter in the first name",
                    },

                    {
                        name: "last_name",
                        message: "Enter in the last name",
                    },
                ])
                .then(async (ans) => {

                    employeeByName(ans.first_name, ans.last_name)
                    .then(employee => {
                        if(employee){
                            inquirer.prompt([
                                {
                                    name: "first_name",
                                    message: "Enter in the new first name?",
                                    default: employee.first_name
                                },
            
                                {
                                    name: "last_name",
                                    message: "Enter in the new last name?",
                                    default: employee.last_name,
                                },
            
                                {
                                    name: "role",
                                    message: "Enter in the Role/Position",
                                    type: "list",
                                    choices: roleChoices,
                                },
            
                                {
                                    name: "manager",
                                    message: "Enter In Manager",
                                    type: "list",
                                    choices: employeeChoices,
                                }
                            ])
                            .then(async (answers) => {
                                let role_id;
                                let manager_id = null;
            
                                // determine the role id
                                for(let i in roles){
                                    if(roles[i].title === answers.role){
                                        role_id = roles[i].id;
                                    }
            
                                }
            
                                // determine the manager id
                                for(let i in employees){
                                    if((employees[i].first_name + " " + employees[i].last_name)  === answers.manager){
                                        manager_id = employees[i].id;
                                    }
            
                                }
            
                                // add the department
                                await updateEmployee(employee.id, answers.first_name, answers.last_name, role_id, manager_id);
                            })
                            .then(() => {
                                mainMenu();
                            })
                            .catch(error => {
                                console.log(error);
                            });
                        }else{
                            console.log("Employee not found");
                            mainMenu();
                        }
                    });

                })
                .catch(error => {
                    console.log(error);
                });
            });
        }); 
    }
   
    // delete
    else if(answers.action === "Delete A Department"){
        allDepartments()
        .then(departments => {
            departmentOptions = [];

            for(let i in departments){
                departmentOptions.push(departments[i].name);
            }

            inquirer.prompt([
                
                {
                    name: "department",
                    message: "Which department do you want to delete?",
                    type: "list",
                    choices: departmentOptions,
                }
            ])
            .then(async (answers) => {
                let department_id;

                // determine the department id
                for(let i in departments){
                    if(departments[i].name === answers.department){
                        department_id = departments[i].id;
                    }

                }
                // delete the department
                await deleteDepartment(department_id);
            })
            .then(() => {
                mainMenu();
            })
            .catch(error => {
                console.log(error);
            });
        });
    }

    // delete a role
    else if(answers.action === "Delete A Role"){
        allRoles()
        .then(roles => {
            roleChoices = [];

            for(let i in roles){
                roleChoices.push(roles[i].title);
            }

            inquirer.prompt([
                
                {
                    name: "role",
                    message: "Which role do you want to delete?",
                    type: "list",
                    choices: roleChoices,
                }
            ])
            .then(async (answers) => {
                let role_id;

                // determine the role id
                for(let i in roles){
                    if(roles[i].title === answers.role){
                        role_id = roles[i].id;
                    }

                }
                // delete the role
                await deleteRole(role_id);
            })
            .then(() => {
                mainMenu();
            })
            .catch(error => {
                console.log(error);
            });
        });
    }

    // delete an employee
    else if(answers.action === "Delete An Employee"){
        allEmployees()
        .then(employees => {
            employeeChoices = [];

            for(let i in employees){
                employeeChoices.push(employees[i].first_name + " " + employees[i].last_name);
            }

            inquirer.prompt([
                
                {
                    name: "employee",
                    message: "Which employee do you want to remove from the database?",
                    type: "list",
                    choices: employeeChoices,
                }
            ])
            .then(async (answers) => {
                let employee_id;

                // determine the employee id
                for(let i in employees){
                    if((employees[i].first_name + " " + employees[i].last_name) === answers.employee){
                        employee_id = employees[i].id;
                    }

                }
                // delete the employee
                await deleteEmployee(employee_id);
            })
            .then(() => {
                mainMenu();
            })
            .catch(error => {
                console.log(error);
            });
        });
    }

    // view all the employees by manager
    else if(answers.action === "View Employees By Manager"){
        viewAllEmployeesByManager()
        .then(() => {
            mainMenu();
        });
    }

    // view all the employees by department
    else if(answers.action === "View Employees By Department"){
        viewAllEmployeesByDepartment()
        .then(() => {
            mainMenu();
        });
    }

    // view all the employees by department
    else if(answers.action === "View Total Budget By Department"){
        viewUtilizedBudgetByDepartment()
        .then(() => {
            mainMenu();
        });
    }
}

const mainMenu = () => {
    // main menu options
    const mainMenuOptions = [
        "View All Departments",
        "View All Roles",
        "View All Employees",
        "View Employees By Manager",
        "View Employees By Department",
        "View Total Budget By Department",
        "Add A Department",
        "Add A Role",
        "Add An Employee",
        "Update An Employee",
        "Delete A Department",
        "Delete A Role",
        "Delete An Employee",
    ];
    
    inquirer.prompt([
        {
            name: "action",
            message: "What would you like to do?",
            type: "list",
            choices: mainMenuOptions,
        },
    
    ])
    .then((answers) => {
        handleMenu(answers);
    })
    .catch(error => {
        console.log(error);
    });
}

module.exports = mainMenu;