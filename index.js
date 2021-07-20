// Importing necessary NPM Packages and files
const inquirer = require('inquirer');
const chalk = require('chalk');
let cTable = require('console.table');
const connection = require('./employeesDB/employeesDBConnection');

// Global variables used to convert the selected role & manager ID's to a numeric value
let roleID;
let managerID;
let departmentID;

// ASCII Banner that greets the user when they run the application
console.log(chalk.green(
    `
     /$$$$$$$$                      /$$                                    
    | $$_____/                     | $$                                    
    | $$      /$$$$$$/$$$$  /$$$$$$| $$ /$$$$$$ /$$   /$$ /$$$$$$  /$$$$$$ 
    | $$$$$  | $$_  $$_  $$/$$__  $| $$/$$__  $| $$  | $$/$$__  $$/$$__  $$
    | $$__/  | $$ \\ $$ \\ $| $$  \\ $| $| $$  \\ $| $$  | $| $$$$$$$| $$$$$$$$
    | $$     | $$ | $$ | $| $$  | $| $| $$  | $| $$  | $| $$_____| $$_____/
    | $$$$$$$| $$ | $$ | $| $$$$$$$| $|  $$$$$$|  $$$$$$|  $$$$$$|  $$$$$$$
    |________|__/ |__/ |__| $$____/|__/\\______/\\____   $$\\_______/\\_______/
                          | $$                  /$$  | $$                  
                          | $$                 |  $$$$$$/                  
                          |__/                  \\______/                   
     /$$      /$$                                                          
    | $$$    /$$$                                                          
    | $$$$  /$$$$ /$$$$$$ /$$$$$$$  /$$$$$$  /$$$$$$  /$$$$$$  /$$$$$$     
    | $$ $$/$$ $$|____  $| $$__  $$|____  $$/$$__  $$/$$__  $$/$$__  $$    
    | $$  $$$| $$ /$$$$$$| $$  \\ $$ /$$$$$$| $$  \\ $| $$$$$$$| $$  \\__/    
    | $$\\ $  | $$/$$__  $| $$  | $$/$$__  $| $$  | $| $$_____| $$          
    | $$ \\/  | $|  $$$$$$| $$  | $|  $$$$$$|  $$$$$$|  $$$$$$| $$          
    |__/     |__/\\_______|__/  |__/\\_______/\\____  $$\\_______|__/          
                                            /$$  \\ $$                      
                                           |  $$$$$$/                      
                                            \\______/                       
    `
));

// Initial prompt that will be given to the user when they first run the application
// and also again after every sequence of choices until finally the user is finished
const initPrompts = [
    {
        type: 'list',
        message: 'What would you like to do?',
        name: 'startChoice',
        choices: ['View All Employees', 'View All Departments', 'View All Roles', 'Add Employee', 'Remove Employee', 'Update Employee Role', 'Add Role', 'Add Department', 'Quit']
    }
];

// Prompts that will be given to the user when they want to add a new employee
const addEmpPrompts = [
    {
        type: 'input',
        message: 'What is the employee\'s first name?',
        name: 'firstName'
    },
    {
        type: 'input',
        message: 'What is the employee\'s last name?',
        name: 'lastName'
    },
    {
        type: 'list',
        message: 'What is the employee\'s role?',
        name: 'role',
        choices: ['Salesperson', 'Sales Manager', 'Accountant', 'Account Manager', 'Lawyer', 'Legal Team Lead', 'Software Engineer', 'Lead Engineer']
    },
    {
        type: 'list',
        message: 'Who is the employee\'s manager?',
        name: 'manager',
        choices: ['None', 'Jeff Harkens', 'Aaron Loom', 'David Ernest', 'Michael Thomas']
    }
];

// Prompts that will be given to the user when they want to add a new department
const addDepPrompts = [
    {
        type: 'input',
        message: 'What is the name of the department you would like to add?',
        name: 'department'
    }
];

// This function is the initialization of the application
// The user will be prompted with what they would like to do
// and a correlating function will be called based on their choice
function init() {

    inquirer.prompt(initPrompts)
        .then((res) => {
            if (res.startChoice == 'View All Employees') {
                viewAllEmployees();
            } else if (res.startChoice == 'View All Departments') {
                viewAllDepartments();
            } else if (res.startChoice == 'View All Roles') {
                viewAllRoles();
            } else if (res.startChoice == 'Add Employee') {
                createEmployeeIDs();
            } else if (res.startChoice == 'Remove Employee') {
                removeEmployee();
            } else if (res.startChoice == 'Update Employee Role') {
                updateRoleEmp();
            } else if (res.startChoice == 'Add Role') {
                addRole();
            } else if (res.startChoice == 'Add Department') {
                addDepartment();
            } else if (res.startChoice == 'Quit') {
                console.log('Thanks for using the Employee Manager!');
                connection.end();
            } else {
                connection.end();
            }
        });

};

// This function prints a list of all the employees through a MySQL query
function viewAllEmployees() {

    connection.query('SELECT * FROM employee', (err, results) => {
        if (err) throw err;

        cTable = results;

        console.table(cTable);
        init();
    })

};

// This function prints a list of all the departments through a MySQL query
function viewAllDepartments() {

    connection.query('SELECT name FROM department', (err, results) => {
        if (err) throw err;

        cTable = results;

        console.table(cTable);
        init();
    });

};

// This function prints a list of all the roles through a MySQL query
function viewAllRoles() {

    connection.query('SELECT title FROM role', (err, results) => {
        if (err) throw err;

        cTable = results;

        console.table(cTable);
        init();
    });

};

// This is the first function that is called whent the user wants to create a new employee
// This function uses the roleID and managerID global variables to set the role id and manager id
// based off of the roles and manager of the new employee that is being added
function createEmployeeIDs() {

    inquirer.prompt(addEmpPrompts)
    .then((res) => {
        if (res.role == 'Salesperson' || res.role == 'Sales Manager') {
            roleID = 1;
        } else if (res.role == 'Accountant' || res.role == 'Account Manager') {
            roleID = 2;
        } else if (res.role == 'Lawyer' || res.role == 'Legal Team Lead') {
            roleID = 3;
        } else if (res.role == 'Software Engineer' || res.role == 'Lead Engineer') {
            roleID = 4;
        } else {
            connection.end();
        }

        if (res.manager == 'None') {
            managerID;
        } else if (res.manager == 'Jeff Harkens') {
            managerID = 1;
        } else if (res.manager == 'Aaron Loom') {
            managerID = 2;
        } else if (res.manager == 'David Ernest') {
            managerID = 3;
        } else if (res.manager == 'Michael Thomas') {
            managerID = 4;
        } else {
            connection.end();
        }
        addEmployee(res.firstName, res.lastName, roleID, managerID);
    });

}

// This function is called at the end of the createEmployeeIDs function
// It is passed the parameters of the user inputted first name, last name, role id, and manager id
// of the new employee that is being added to the database.
// It then creates a new employee in the database through a MySQL query
function addEmployee(firstName, lastName, roleID, managerID) {

    connection.query('INSERT INTO employee SET ?',
    {
        first_name: firstName,
        last_name: lastName,
        role_id: roleID,
        manager_id: managerID
    },
    (err, res) => {
        if (err) throw err;

        console.log('Employee has been successfully added!');
        init();
    })

};

// This function uses a MySQL query to prompt the user with a list of all employees by first name
// The user then chooses which employee to remove and a MySQL query is called to delete
// that employee from the database
const removeEmployee = () => {

        connection.query('SELECT first_name FROM employee', (err, results) => {
        if (err) throw err;

        inquirer.prompt([
            {
                type: 'rawlist',
                name: 'employee',
                choices() {
                    const choiceArray = [];
                    results.forEach(({ first_name }) => {
                        choiceArray.push(first_name);
                    });
                    return choiceArray;
                },
                message: 'Which employee do you want to remove?'
            }
        ])
        .then((res) => {
            connection.query('DELETE FROM employee WHERE ?',
            {
                first_name: res.employee
            })
            console.log('Employee has been successfully removed!')
            init();
        });
    });

};

// This is the first function that is called whent the user wants to update the role of an employee
// This function uses a MySQL query to prompt the user with a list of all employees by first name
// The user then chooses which employee to update the role of
// That data is then passed to the updateRole function
function updateRoleEmp() {

    connection.query('SELECT first_name FROM employee', (err, results) => {
        if (err) throw err;

        inquirer.prompt([
            {
                type: 'rawlist',
                name: 'employee',
                choices() {
                    const choiceArray = [];
                    results.forEach(({ first_name }) => {
                        choiceArray.push(first_name);
                    });
                    return choiceArray;
                },
                message: 'Which employee do you want to update the role for?'
            }
        ])
        .then((res) => {
            updateRole(res.employee);
        })

    });

};

// This function is called at the end of the updateRoleEmp function
// It is passed the parameters of the user selected employee by first name
// The function then assigns a new value to the role_id of the employee in the database through a MySQL query
function updateRole(employee) {

    connection.query('SELECT title FROM role', (err, results) => {
        if (err) throw err;
        inquirer.prompt([
            {
                type: 'rawlist',
                name: 'role',
                choices() {
                    const choiceArray = [];
                    results.forEach(({ title }) => {
                        choiceArray.push(title);
                    });
                    return choiceArray;
                },
                message: 'What do you want to update this employee\'s role to?'
            }
        ])
        .then((res) => {
            if (res.role == 'Salesperson' || res.role == 'Sales Manager') {
                roleID = 1;
            } else if (res.role == 'Accountant' || res.role == 'Account Manager') {
                roleID = 2;
            } else if (res.role == 'Lawyer' || res.role == 'Legal Team Lead') {
                roleID = 3;
            } else if (res.role == 'Software Engineer' || res.role == 'Lead Engineer') {
                roleID = 4;
            } else {
                connection.end();
            }
            connection.query('UPDATE employee SET ? WHERE ?',
            [
                {
                    role_id: roleID         
                },
                {
                    first_name: employee
                }
            ],
            console.log('Employee role has been successfully updated!'));
            init();
        });
    });
};

// This function adds a new role to a specific existing department in the database using a MySQL query
function addRole() {

    connection.query('SELECT name FROM department', (err, results) => {
        if (err) throw err;
        inquirer.prompt([
            {
                type: 'input',
                message: 'What is the name of the role you would like to add?',
                name: 'role'
            },
            {
                type: 'input',
                message: 'What is the salary for this role?',
                name: 'salary'
            },
            {
                type: 'rawlist',
                name: 'department',
                choices() {
                    const choiceArray = [];
                    results.forEach(({ name }) => {
                        choiceArray.push(name);
                    });
                    return choiceArray;
                },
                message: 'Which department does this role belong to?'
            }
        ])
        .then((res) => {
            if (res.department == 'Sales') {
                departmentID = 1;
            } else if (res.department == 'Finance') {
                departmentID = 2;
            } else if (res.department == 'Legal') {
                departmentID = 3;
            } else if (res.department == 'Engineering') {
                departmentID = 4;
            } else if (res.department == 'Human Resources') {
                departmentID = 5;
            } else {
                connection.end();
            }
            connection.query('INSERT INTO role SET ?',
            {
                title: res.role,
                salary: res.salary,
                department_id: departmentID
            },
            (err, res) => {
                if (err) throw err;

                console.log('Role has been successfully added!');
                init();
            })

        });

    });

};

// This function adds a new department to the database using a MySQL query
function addDepartment() {

    inquirer.prompt(addDepPrompts)
        .then((res) => {
            connection.query('INSERT INTO department SET ?',
            {
                name: res.department
            },
            (err, res) => {
                if (err) throw err;
        
                console.log('Department has been successfully added!');
                init();
            })

        });

};

init();

