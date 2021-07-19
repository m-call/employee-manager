-- Ensures we are targeting the employees_db in MySQL --
USE employees_db;

-- Creates new rows containing data in the department table --
INSERT INTO department (name)
VALUES ("Sales");

INSERT INTO department (name)
VALUES ("Finance");

INSERT INTO department (name)
VALUES ("Legal");

INSERT INTO department (name)
VALUES ("Engineering");

-- Creates new rows containing data in the role table --
INSERT INTO role (title, salary, department_id)
VALUES ("Salesperson", 80000, 1);

INSERT INTO role (title, salary, department_id)
VALUES ("Sales Manager", 120000, 1);

INSERT INTO role (title, salary, department_id)
VALUES ("Accountant", 120000, 2);

INSERT INTO role (title, salary, department_id)
VALUES ("Account Manager", 160000, 2);

INSERT INTO role (title, salary, department_id)
VALUES ("Lawyer", 160000, 3);

INSERT INTO role (title, salary, department_id)
VALUES ("Legal Team Lead", 220000, 3);

INSERT INTO role (title, salary, department_id)
VALUES ("Software Engineer", 140000, 4);

INSERT INTO role (title, salary, department_id)
VALUES ("Lead Engineer", 240000, 4);

-- Creates new rows containing data in the employee table --
INSERT INTO employee (first_name, last_name, role_id)
VALUES ("Jeff", "Harkens", 1);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Ian", "Dooley", 1, 1);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Paul", "Moore", 1, 1);

INSERT INTO employee (first_name, last_name, role_id)
VALUES ("Aaron", "Loom", 2);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Mark", "Gray", 2, 2);

INSERT INTO employee (first_name, last_name, role_id)
VALUES ("David", "Ernest", 3);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Ray", "Orlando", 3, 3);

INSERT INTO employee (first_name, last_name, role_id)
VALUES ("Michael", "Thomas", 4);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Huey", "Ford", 4, 4);



