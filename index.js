// Importing necessary NPM Packages and files
const inquirer = require('inquirer');
const chalk = require('chalk');
let cTable = require('console.table');
const connection = require('./employeesDB/employeesDBConnection');

// Used to convert the selected role/manager to a numeric id value
let roleID;
let managerID;

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

const initPrompts = [
    {
        type: 'list',
        message: 'What would you like to do?',
        name: 'startChoice',
        choices: ['View All Employees', 'View All Departments', 'View All Roles', 'Add Employee', 'Remove Employee', 'Update Employee Role', 'Add Role', 'Remove Role', 'Add Department', 'Remove Department', 'Quit']
    }
];

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

const updateManPrompts = [
    {
        type: 'list',
        message: 'Which employee do you want to update the manager for?',
        name: 'employee',
        choices: []
    }
];

const addDepPrompts = [
    {
        type: 'input',
        message: 'What is the name of the department you would like to add?',
        name: 'department'
    }
];

const removeDepPrompts = [
    {
        type: 'list',
        message: 'Which department would you like to remove?',
        name: 'department',
        choices: []
    }
];

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
            } else if (res.startChoice == 'Remove Role') {
                removeRole();
            } else if (res.startChoice == 'Add Department') {
                addDepartment();
            } else if (res.startChoice == 'Remove Department') {
                removeDepartment();
            } else if (res.startChoice == 'Quit') {
                console.log('Thanks for using the Employee Manager!');
                connection.end();
            } else {
                connection.end();
            }
        });

};

function viewAllEmployees() {

    connection.query('SELECT * FROM employee', (err, results) => {
        if (err) throw err;

        cTable = results;

        console.table(cTable);
        init();
    })

};

const viewByDepartment = () => {

    // connection.query('SELECT name FROM department', (err, results) => {
    //     if (err) throw err;

    //     inquirer.prompt([
    //         {
    //             type: 'rawlist',
    //             name: 'department',
    //             choices() {
    //                 const choiceArray = [];
    //                 results.forEach(({ name }) => {
    //                     choiceArray.push(name);
    //                 });
    //                 return choiceArray;
    //             },
    //             message: 'Which department would you like to see employees for?'
    //         }
    //     ])
    //     .then((res) => {
    //         let chosenItem;
    //         res.forEach((department) => {
    //             if (department.name === )
    //         })
    //     });
    // });

    // const depPrompts = [
    //     {
    //         type: 'list',
    //         message: 'Which department would you like to see employees for?',
    //         name: 'department',
    //         choices: []
    //     }
    // ];

    // inquirer.prompt()
    //     .then((res) => {

    //     });

};

function viewAllDepartments() {

    connection.query('SELECT name FROM department', (err, results) => {
        if (err) throw err;

        cTable = results;

        console.table(cTable);
        init();
    });

};

function viewAllRoles() {

    connection.query('SELECT title FROM role', (err, results) => {
        if (err) throw err;

        cTable = results;

        console.table(cTable);
        init();
    });

};

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
        console.log(roleID, managerID);
        addEmployee(res.firstName, res.lastName, roleID, managerID);
    });

}

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
            console.log(res.role);
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

function addRole() {

    inquirer.prompt(updateManPrompts)
        .then((res) => {

        });

};

function removeRole() {

    inquirer.prompt(updateManPrompts)
    .then((res) => {

    });

}

function addDepartment() {

    inquirer.prompt(addDepPrompts)
        .then((res) => {

        });

};

function removeDepartment() {

    inquirer.prompt(removeDepPrompts)
        .then((res) => {

        });

};

init();

