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
        choices: ['View All Employees', 'View All Employees By Department', 'View All Employees By Manager', 'Add Employee', 'Remove Employee', 'Update Employee Role', 'Update Employee Manager']
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
            } else if (res.startChoice == 'Update Employee Manager'){
                updateManager();
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

};

function viewByManager() {

};

function addEmployee() {

};

function removeEmployee () {

};

function updateRole() {

};

function updateManager() {

};

init();

