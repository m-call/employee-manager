# Employee Tracker

![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)

  ## Table of Contents
  * [Description](#description)
  * [Usage](#usage)
  * [Screenshot](#screenshot)
  * [License](#license)
  * [Credits](#credits)
  * [Questions](#questions)

  ## Description
  This application is a Content Management System that allows the user to easily manage all of the employees for any given company with data that is stored in a MySQL database. The application uses the Inquirer module to prompt the user, the Chalk module to color the ASCII greeting, the MySQL module to set up a connection to the local MySQL database, and the console.table module to neatly display the MySQL database data in a table. This application allows the user to view all of their company's employees, roles, and departments, add and remove employees, add roles and departments, and update an employee's role. 

  ## Usage
  To use this application, the user would need to have node installed on their computer. Then, the user would run node index.js in the console. The user will then be prompted with what they would like to do. They have the option to view all of their company's employees, roles, and departments, add and remove employees, add roles and departments, and update an employee's role. If the user chooses to view their company's employees, roles, or departments, they will see that corresponding information in a table format in the console. If the user decides to add a new employee, they will be prompted to enter the employee's first name, last name, role, and manager. If the user wants to remove an employee from the database, they will be given a list of all the employees in the company and choose the one they want to remove. If the user wants to update the role of an employee, they will select the employee that they want to update the role of, then they will be given a list of existing roles to choose from to update the employee's role to. If the user wants to add a new role, they will be prompted to enter the name of the role, the salary, and which existing department that role belongs to. Finally, if the user wants to add a new department, they will simply be prompted to enter the name of the new department that they want to add. Once the user is done, they can click the quit option and they will be disconnected from the MySQL database and the application will stop running.

  ### Example of How to Use This Application
  An mp4 file is included in this repository if you want to view the demonstration in video format.
  ![Usage Gif](./assets/images/Employee-Tracker-Walkthrough.gif)

  ## License 
  This project is licensed under the [MIT License](https://opensource.org/licenses/MIT).

  ## Credits
  This application was an assignment for the GA Tech Full Stack Web Development Coding Bootcamp. No starter files or code were provided for this assignment.

  ## Questions
  If you have any questions about the repo, open an issue or contact me directly:
  * Please contact me directly at my [GitHub](https://github.com/mcall0147)
  * Or contact me by email at [mcallahanx93@gmail.com](mailto:mcallahanx93@gmail.com)