const inquirer = require('inquirer');
const chalk = require('chalk');
const connection = require('./employeesDBConnection');

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
        choices: ['View All Employees', 'View All Employees By Department', 'View All Employees By Manager', 'Add Employee', 'Remove Employee', 'Update Employee Role', 'Update Employee Manager', 'Add Department', 'Remove Department', 'Quit']
    }
];

const depPrompts = [
    {
        type: 'list',
        message: 'Which department would you like to see employees for?',
        name: 'department',
        choices: ['Sales', 'Finance', 'Legal', 'Engineering']
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

function init() {

    inquirer.prompt(initPrompts)
        .then((res) => {
            if (res.startChoice == 'View All Employees') {
                viewAllEmployees();
            } else if (res.startChoice == 'View All Employees By Department') {
                viewByDepartment();
            } else if (res.startChoice == 'View All Employees By Manager') {
                viewByManager();
            } else if (res.startChoice == 'Add Employee') {
                addEmployee();
            } else if (res.startChoice == 'Remove Employee') {
                removeEmployee();
            } else if (res.startChoice == 'Update Employee Role') {
                updateRole();
            } else if (res.startChoice == 'Update Employee Manager') {
                updateManager();
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

        console.table(results);
    });

};

function viewByDepartment() {

    inquirer.prompt(depPrompts)
        .then((res) => {

        });

};

function viewByManager() {

    inquirer.prompt(manPrompts)
        .then((res) => {

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

};

function updateManager() {

};

function addDepartment() {

};

function removeDepartment() {

};

init();

