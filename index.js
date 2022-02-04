// require dependencies etc
const mysql = require('mysql2');
const inquirer = require('inquirer')
const db = require('./db/connection');


// present user with options
async function init() {
    const response = await inquirer
    // Prompt user for employee type
    .prompt([{
        type: 'list',
        message: "What would you like to do?",
        choices: ['View All Employees', 'Add Employee', 'Update Employee Role', 'View All Roles', 'Add Role', 'View all Departments', 'Add Department', 'Quit'],
        name: 'toDo', 
    },])

    console.log(response);
  
    if(response.toDo == 'View All Employees') { 
        viewAllEmployees(); // created
    } else if (response.toDo == 'Add Employee') { 
        addEmployee(); // created
    } else if (response.toDo == 'Update Employee Role') { 
        updateEmployeeRole(); // created
    }  else if (response.toDo == 'View All Roles') { 
        viewAllRoles(); // created
    }  else if (response.toDo == 'Add Role') { 
        addRole(); // created
    }  else if (response.toDo == 'View all Departments') { 
        viewAllDepartments(); // created
    }  else if (response.toDo == 'Add Department') { 
        addDepartment(); // created
    }  else {
        // close out
        console.log("Thanks, type 'npm start' to make more changes.")
        process.exit();
    }
}

// view all departments - READ - "SELECT * FROM [table_name]";
async function viewAllDepartments() {
    
    const departments = await db.query('SELECT * FROM department');

    console.table(departments);

    init();

};

// view all roles
async function viewAllRoles() {
    
    const roles = await db.query('SELECT * FROM role JOIN department ON role.department = department.id');

    console.table(roles);

    init();

};

// view all employees - READ - "SELECT * FROM [table_name]"; review JOIN
async function viewAllEmployees() {

    const employees = await db.query(
    `SELECT employee.id, employee.first_name, employee.last_name, role.role, department.department AS department, role.salary, 
    CONCAT(manager.first_name, ' ', manager.last_name) AS manager 
    FROM employee 
    LEFT JOIN role on employee.role = role.id 
    LEFT JOIN department on role.department = department.id 
    LEFT JOIN employee manager on manager.id = employee.manager`);

    console.table(employees);

    init();

};

// add a department - CREATE - "INSERT INTO [table_name] (col1, col2) VALUES (value1, value2)"
async function addDepartment() {

    const response = await inquirer
    // Prompt user for employee type
    .prompt([
        {
        type: 'input',
        message: "What is name of the department?",
        name: 'newDepartment', 
        },
    ])
    
    db.query('INSERT INTO department (department) VALUES (?)', [ response.newDepartment]);

    console.log(`Added ${response.newDepartment} to database.`);

    init();

};

// add a role - CREATE -
async function addRole() {

    // SELECT the existing departments from the 'department' table
    const departments = await db.query('SELECT * FROM department'); // try promise all

    // Map the results from 'roles' to question data for inquirer
    const choices = departments.map( department => {
        return {
            name: department.department, // might need to change this back to dept_name
            value: department.id
        }
    })

    const response = await inquirer
    // Prompt user for role details
    .prompt([
        {
        type: 'input',
        message: "What is name of the role?",
        name: 'newRole', 
        },
        {
        type: 'input',
        message: "What is salary for the role?",
        name: 'newSalary', 
        },
        {
            type: 'list',
            message: "What department would you like to add it to?",
            choices: choices,
            name: 'departmentId', 
        },
    ])
    

    db.query('INSERT INTO role (role, salary, department) VALUES (?,?,?)', [ response.newRole, response.newSalary, response.departmentId ]);

    // console.log(response.departmentId); // find out what this is and then add to the insertRole
    console.log(`Added ${response.newRole} to database.`);

    init();

};


// add an employee - CREATE
// add a role - CREATE -
async function addEmployee() {

    // SELECT the existing roles from the 'role' table
    const roles = await db.query('SELECT * FROM role');

    // Map the results from 'roles' to question data for inquirer
    const roleChoices = roles.map( role => {
        return {
            name: role.role,
            value: role.id
        }
    })

    // SELECT the existing departments from the 'department' table
    const managers = await db.query('SELECT * FROM employee');

    // Map the results from 'roles' to question data for inquirer
    const managerChoices = managers.map( employee => {
        return {
            name: employee.first_name +" "+ employee.last_name,
            value: employee.id
        }
    })

    const response = await inquirer
    // Prompt user for role details
    .prompt([
        {
        type: 'input',
        message: "What is the employees first name?",
        name: 'employeeFirstName', 
        },
        {
        type: 'input',
        message: "What is the employees last name?",
        name: 'employeeLastName', 
        },
        {
            type: 'list',
            message: "What is the employees role?",
            choices: roleChoices,
            name: 'employeeRole', 
        },
        {
            type: 'list',
            message: "Who is the employees manager?",
            choices: managerChoices,
            name: 'managerChoices', 
        },
    ])

    db.query('INSERT INTO employee (first_name, last_name, role, manager) VALUES (?,?,?,?)', [ response.employeeFirstName, response.employeeLastName, response.employeeRole, response.managerChoices ]);

    console.log(`Added ${response.employeeFirstName + response.employeeLastName} to database.`);

    init();

};


// update an employee
async function updateEmployeeRole() {

    // SELECT the existing employees from the 'employee' table
    const employees = await db.query('SELECT * FROM employee');
    
    // Map the results from 'employees' to question data for inquirer
    const choices = employees.map( employee => {
        return {
            name: employee.first_name +" "+employee.last_name,
            value: employee.id
        }
    })

    // SELECT the existing roles from the 'role' table
    const roles = await db.query('SELECT * FROM role');

    // Map the results from 'roles' to question data for inquirer
    const roleChoices = roles.map( role => {
        return {
            name: role.role,
            value: role.id
        }
    })

    const response = await inquirer
    // Prompt user for role details
    .prompt([
        {
            type: 'list',
            message: "Which employee role do you want to update?",
            choices: choices,
            name: 'employeeToUpdate',
        },
        {
            type: 'list',
            message: "Which role do you want to assign to the selected employee?",
            choices: roleChoices,
            name: 'newRole',
        },
    ])
    
    // await Promise.all([departments,response]); // Not sure if I'm using this right!

    db.query('UPDATE employee SET role = ? WHERE id = ?', [ response.newRole, response.employeeToUpdate ]);

    // console.log(response.departmentId); // find out what this is and then add to the insertRole
    console.log(`Database has been updated.`);

    init();

};

// Initiate program
init();