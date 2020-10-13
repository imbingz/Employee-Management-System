// IMPORT PACKAGES AND MODULES =============================================================================================
const startDisplay = require('./lib/starter');
const connection = require('./lib/connection');
const questions = require('./lib/questions');

const { prompt } = require('inquirer');
const cTable = require('console.table');
const term = require("terminal-kit").terminal;

// DISPLAY EMPLOYEE TRACKER WHEN STARTING THE APP =============================================================================================

startDisplay();


// PROMPTING QUESTIONS =============================================================================================

// function start() {
//   prompt({name: ,
// type: ,
//   message: ,
// choices: }).then(answer => {})
// }

function start() {
  prompt(questions)
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
        default:
          connection.end()
      }
    });
}



// FUNCTIONS TO HANDLE EACH CASE ===============================================================================================

//Function to handle "View all employees"
function readAllEmployees() {
  //SELECT all employeeID, name, title, salary, department, manager to display
  connection.query(
    "SELECT e.id, e.first_name, e.last_name, r.title, r.salary, d.name AS department, CONCAT(m.first_name, ' ',  m.last_name) AS manager FROM employee e LEFT JOIN role r ON e.role_id = r.id LEFT JOIN department d on r.department_id = d.id LEFT JOIN employee m ON m.id = e.manager_id",

    (err, res) => {
      if (err) throw err;

      //Display data in table format 
      console.table("\n", res);
      
      //Start prompting the questions again
      start() 
    }
  )
};

//Function to handle "View all employees by department"
function readEmpByDept() {
  //SELECT all employeeID, name, title, salary, department ORDERED by department 
  connection.query(
    "SELECT e.id, e.first_name, e.last_name, r.title, r.salary, d.name AS department FROM employee e LEFT JOIN role r ON e.role_id = r.id LEFT JOIN department d on r.department_id = d.id",

    (err, res) => {
      if (err) throw err;

      //Display data in table format 
      console.table("\n", res);

      //Start prompting the questions again
      start();
    }
  );
};

















// EXPORT MODULE ===============================================================================================
module.exports = start();