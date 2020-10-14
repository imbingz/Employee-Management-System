// IMPORT PACKAGES AND MODULES =============================================================================================
const startDisplay = require('./lib/starter');
const connection = require('./lib/connection');
const roles = require('./lib/roles')
// const questions = require('./lib/addEmpQuestion')

const { prompt } = require('inquirer');
const cTable = require('console.table');
const term = require("terminal-kit").terminal;

// DISPLAY EMPLOYEE TRACKER WHEN STARTING THE APP =============================================================================================

// startDisplay();


// PROMPTING QUESTIONS =============================================================================================

function start() {
  prompt(
    {
      name: "task",
      type: "list",
      message: "What would you like to do?",
      choices: ["View all employees", "View all employees by Department", "View all employees by Managers", "Add employees", "Remove employees", "Update employees", "Update employee Manager", "Exit"]
    }
  )
    .then(answer => { 
      
      switch (answer.task) {
        case "View all employees":
          readAllEmployees();
          break;
        case "View all employees by Department":
          readEmpByDept();
          break;
        case "View all employees by Managers":
          readEmpByMngr();
          break;
        case "Add employees":
          insertEmployees();
          break;
        case "Remove employees":
          deleteEmployees();
          break;
        case "Update employees":
          updateEmployees();
          break;
        case "Update employee Manager":
          updateEmpMngr();
          break;
        case "Exit":
          connection.end()
      }
    });
}



// FUNCTIONS TO HANDLE EACH CASE ===============================================================================================

//Function to handle "View all employees"
// function readAllEmployees() {
//   //SELECT all employeeID, name, title, salary, department, manager to display
//   connection.query(
//     "SELECT e.id, e.first_name, e.last_name, r.title, r.salary, d.name AS department, CONCAT(m.first_name, ' ',  m.last_name) AS manager FROM employee e LEFT JOIN role r ON e.role_id = r.id LEFT JOIN department d on r.department_id = d.id LEFT JOIN employee m ON m.id = e.manager_id",

//     (err, res) => {
//       if (err) throw err;

//       // console.log(res);
//       //Display data in table format 
//       console.table("\n", res);
      
//       //Start prompting the questions again
//       start() 
//     }
//   )
// };


//Function to handle "View all employees by department"
// function readEmpByDept() {
//   //SELECT all employeeID, name, title, salary, department ORDERED by department 
//   connection.query(
//     "SELECT d.id, d.name AS department, r.title, e.first_name, e.last_name, r.salary, CONCAT(m.first_name, ' ', m.last_name) AS manager FROM department d LEFT JOIN role r on r.department_id = d.id LEFT JOIN employee e ON e.role_id = r.id LEFT JOIN employee m ON m.id = e.manager_id",

//     (err, res) => {
//       if (err) throw err;

//       //Display data in table format 
//       console.table("\n", res);

//       //Start prompting the questions again
//       start();
//     }
//   );
// };

//Function to handle "View all employees by managers"
// function readEmpByMngr() {
//   //SELECT all managerID, name, title, salary, department ORDERED BY manager_id
//   connection.query(
//     "SELECT m.manager_id, m.first_name, m.last_name, r.title, r.salary, d.name AS department FROM employee m LEFT JOIN employee e ON m.id = e.manager_id LEFT JOIN role r on m.role_id = r.id LEFT JOIN department d on r.department_id = d.id",

//     (err, res) => {
//       if (err) throw err;

//       //Display data in table format 
//       console.table("\n", res);

//       //Start prompting the questions again
//       start();
//     }
//   );
// };


// const managerArr = function() {
//   let managers = [];
//   connection.query(
//     'SELECT CONCAT(m.first_name, " ",  m.last_name) AS manager FROM employee m LEFT JOIN employee e ON m.id = e.manager_id WHERE m.manager_id != "null"',

//     (err, res) => {
//       if (err) throw err;
//       // console.log(res);

//       for (let i = 0; i < res.length; i++) {
//         managers.push(res[i].manager);
//       }
//      return managers;
//     }
//   );
 
// }

// console.log(managerArr());


//Function to handle "Add employees"
function insertEmployees() {
  prompt([
    {
      name: "department",
      type: "list",
      message: "In which Department does the employee work?",
      choices: 
    },
    {
      name: "role",
      type: "list",
      message: "What is the employee's role?",
      choices: roles

    },
    {
      name: "firstName",
      type: "inpiut",
      message: "What is the employee's First Name?",
      validate: function(name) {
        let pass = name.match(/^[a-zA-ZäöüßÄÖÜ]+$/);
        if (pass) {
          return true;
        }
        return 'Please enter a valid name.';
      }
    },
    {
      name: "lastName",
      type: "inpiut",
      message: "What is the employee's Last Name?",
      validate: function(name) {
        let pass = name.match(/^[a-zA-ZäöüßÄÖÜ]+$/);
        if (pass) {
          return true;
        }
        return 'Please enter a valid name.';
      }
    },
    {
      name: "addManagerNot",
      type: "confirm",
      message: "Would you like to add the employee's manager?",
      default: false
    },
    {
      name: "mFirstName",
      type: "input",
      message: "What is the employee manager's ?",
      default: false
    },
  ])
    .then(answer => { })
}







// EXPORT MODULE ===============================================================================================
module.exports = start();