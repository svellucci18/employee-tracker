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
        addEmployee();
    } else if (response.toDo == 'Update Employee Role') { 
        updateEmployeeRole();
    }  else if (response.toDo == 'View All Roles') { 
        viewAllRoles(); // created
    }  else if (response.toDo == 'Add Role') { 
        addRole();
    }  else if (response.toDo == 'View all Departments') { 
        viewAllDepartments(); // created
    }  else if (response.toDo == 'Add Department') { 
        addDepartment(); // created
    }  else {
        // close out -- this isn't working right now!
        return
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

    const employees = await db.query('SELECT * FROM employee JOIN role ON employee.role = role.id JOIN department ON role.department = department.id');

    console.table(employees);

    init();

};

// add a department - CREATE - "INSERT INTO [table_name] (col1, col2) VALUES (value1, value2)"
async function addDepartment() {

    const response = await inquirer
    // Prompt user for employee type
    .prompt([{
        type: 'input',
        message: "What is new Department?",
        name: 'newDepartment', 
    },])
    
    const insertDepartment = db.query('INSERT INTO department (department) VALUES (?)', [ response.newDepartment]);

    console.log(`Added ${response.newDepartment} to database.`);

    init();

};

// add a role - CREATE - 
// async function createRole() {

//     // SELECT the existing departments out for the 'department' table
        
//         const departments = [ // I think you can just query this instead
//             {
//                 id: 1,
//                 name: "Sales"
//             },
//             {
//                 id: 2,
//                 name: "Accounting"
//             }
//         ]    
//         // .map() the results from 'roles' to question data for inquirer
//         const choices = departments.map( department => {
//             return {
//                 name: department.name,
//                 value: department.id
//         }
//         })
        
//         const answers = await inquirer
//             .prompt([
//                 {
//                     type: "list",
//                     name: "department_id"
//                     message: "Choose a department",
//                     choices: choices
//                     // [
//                     //     { name: "Sales", value: 1 }, //id value from readme
//                     //     { name: "Accounting", value: 2 },
//                     // ]
//                 }   
//             ])
        
//         // take the user's answers and go INSERT them into the 'role' table
// };


// add an employee - CREATE

// update an employee

// Initiate program
init();