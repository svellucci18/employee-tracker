const mysql = require('mysql2');
const inquirer = require('inquirer')
const db = require('./db/connection');

// inquirer
// .prompt([
//     {
//         type: "list",
//         name: "department_id"
//         message: "Choose a department",
//         choices: [
//             { name: "Sales", value: 1 }, //id value from readme
//             { name: "Accounting", value: 2 },
//         ]
//     }   
// ])
// .then((answers) => {
//     console.log(answers); //these will be the value property rather than the name of the choice that the user sees
// })

// present user with options


// view all departments - READ - "SELECT * FROM [table_name]";
async function viewAllDepartments() {};

// view all roles

// view all employees - READ - "SELECT * FROM [table_name]"; review JOIN

async function viewAllEmployees() {

    const employees = await db.query('SELECT * FROM employee');

    console.table(results);

};

// add a department - CREATE - "INSERT INTO [table_name] (col1, col2) VALUES (value1, value2)"

// add a role - CREATE - 
async function createRole() {

    // SELECT the existing departments out for the 'department' table
        
        const departments = [ //I think you can just query this instead
            {
                id: 1,
                name: "Sales"
            },
            {
                id: 2,
                name: "Accounting"
            }
        ]    
        // .map() the results from 'roles' to question data for inquirer
        const choices = departments.map( department => {
            return {
                name: department.name,
                value: department.id
        }
        })
        
        const answers = await inquirer
            .prompt([
                {
                    type: "list",
                    name: "department_id"
                    message: "Choose a department",
                    choices: choices
                    // [
                    //     { name: "Sales", value: 1 }, //id value from readme
                    //     { name: "Accounting", value: 2 },
                    // ]
                }   
            ])
        
        // take the user's answers and go INSERT them into the 'role' table
};


// add an employee - CREATE

// update an employee
