// Importing necessary NPM Packages and files
const inquirer = require('inquirer');
const chalk = require('chalk');
let cTable = require('console.table');
const connection = require('./employeesDBConnection');

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

const manPrompts = [
    {
        type: 'list',
        message: 'Which manager do you want to see the employee list for?',
        name: 'manager',
        choices: ['Jeff Harkens', 'Aaron Loom', 'David Ernest', 'Michael Thomas']
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

const removeEmpPrompts = [
    {
        type: 'list',
        message: 'Which employee do you want to remove?',
        name: 'employee',
        choices: []
    }
];

const updateRolePrompts = [
    {
        type: 'list',
        message: 'Which employee do you want to update the role for?',
        name: 'employee',
        choices: []
    },
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
                addEmployee();
            } else if (res.startChoice == 'Remove Employee') {
                removeEmployee();
            } else if (res.startChoice == 'Update Employee Role') {
                updateRole();
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

function addEmployee() {

    inquirer.prompt(addEmpPrompts)
        .then((res) => {

        });

};

function removeEmployee () {

    inquirer.prompt(removeEmpPrompts)
        .then((res) => {

        });

};

function updateRole() {

    inquirer.prompt(updateRolePrompts)
        .then((res) => {

        });

};

function updateManager() {

    inquirer.prompt(updateManPrompts)
        .then((res) => {

        });

};

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

