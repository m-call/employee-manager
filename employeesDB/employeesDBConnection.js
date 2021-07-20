// Importing the MySQL NPM Package
const mysql = require('mysql');

// Creating a variable for the connection to the MySQL database stored locally
const connection = mysql.createConnection({

    host: 'localhost',

    port: 3306,

    user: 'root',

    password: 'root1234',

    database: 'employees_db'

});

// This connect method initiates the connection to the database
connection.connect();

// This allows us to use connection inside of index.js
module.exports = connection;