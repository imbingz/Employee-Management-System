
// IMPORT PACKAGES AND MODULES =============================================================================================

const { prompt } = require('inquirer');
const connection = require('./lib/connection');
const cTable = require('console.table');
const term = require("terminal-kit").terminal;
const startDisplay = require('./lib/starter');
const questions = require('./lib/questions');


// DISPLAY EMPLOYEE TRACKER WHEN STARTING THE APP =============================================================================================

// startDisplay();


function start() {
  prompt(
    questions[0]
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
          addEmployees();
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
        case "View all Roles":
          readRoles();
          break;
        case "View Department Budgets":
          readDepBudgets();
          break;
        case "Exit":
          connection.end();
      }
    });
}

// FUNCTIONS TO HANDLE EACH CASE ===============================================================================================

// Function to handle "View all employees"
function readAllEmployees() {
  //SELECT all employeeID, name, title, salary, department, manager to display
  connection.query(
    "SELECT e.id, e.first_name, e.last_name, r.title, r.salary, d.name AS department, CONCAT(m.first_name, ' ',  m.last_name) AS manager FROM employee e LEFT JOIN role r ON e.role_id = r.id LEFT JOIN department d on r.department_id = d.id LEFT JOIN employee m ON m.id = e.manager_id",

    (err, res) => {
      if (err) throw err;

      // console.log(res);
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
    "SELECT d.id, d.name AS department, r.title, e.first_name, e.last_name, r.salary, CONCAT(m.first_name, ' ', m.last_name) AS manager FROM department d LEFT JOIN role r on r.department_id = d.id LEFT JOIN employee e ON e.role_id = r.id LEFT JOIN employee m ON m.id = e.manager_id",

    (err, res) => {
      if (err) throw err;

      //Display data in table format 
      console.table("\n", res);

      //Start prompting the questions again
      start();
    }
  );
};

//Function to handle "View all employees by managers"
function readEmpByMngr() {
  //SELECT all managerID, name, title, salary, department ORDERED BY manager_id
  connection.query(
    "SELECT m.manager_id, m.first_name, m.last_name, r.title, r.salary, d.name AS department FROM employee m LEFT JOIN employee e ON m.id = e.manager_id LEFT JOIN role r on m.role_id = r.id LEFT JOIN department d on r.department_id = d.id",

    (err, res) => {
      if (err) throw err;

      //Display data in table format 
      console.table("\n", res);

      //Start prompting the questions again
      start();
    }
  );
};

// Use async ... await 
async function addEmployees() {
  //import promise client
  const promise = require('mysql2/promise');

  // create the connection
  const connection = await promise.createConnection({ host: 'localhost', user: 'root', database: 'employee_db', password: 'password' });

  //Get the roles and managers for prompt choices 
  let roles = [];
  let managers = [];

  const [roleRes] = await connection.execute("SELECT id, title FROM role r");
  roleRes.forEach(role => roles.push(role.title));

  const [managerRes] = await connection.execute('SELECT m.id, CONCAT(m.first_name, " ",  m.last_name) AS manager FROM employee m LEFT JOIN employee e ON m.id = e.manager_id WHERE m.manager_id != ? ORDER BY manager ASC', ["null"]);

  managerRes.forEach(manager => managers.push(manager.manager));

  // Prompt "Add employees" questions 



  

}




//Function to handle "Add employees by managers"










// EXPORT MODULE ===============================================================================================
module.exports = start();