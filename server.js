
// IMPORT PACKAGES AND MODULES =============================================================================================

const { prompt } = require('inquirer');
const connection = require('./lib/connection');
const cTable = require('console.table');
const term = require("terminal-kit").terminal;
const startDisplay = require('./lib/starter');

// const questions = require('./lib/questions');


// DISPLAY EMPLOYEE TRACKER WHEN STARTING THE APP =============================================================================================

// startDisplay();


function start() {
  prompt(
    {
      name: "task",
      type: "list",
      message: "What would you like to do?",
      choices: ["View all employees", "View all employees by Department", "View all employees by Managers", "Add employees", "Remove employees", "Update employees", "Update employee Manager", "View all Roles", "View all Department", "Exit"]
    }
  )
    .then(answer => {

      switch (answer.task) {
        case "View all employees":
          viewAllEmployees();
          break;
        case "View all employees by Department":
          viewEmpByDept();
          break;
        case "View all employees by Managers":
          viewEmpByMngr();
          break;
        case "Add employees":
          addEmployees();
          break;
        case "Remove employees":
          removeEmployees();
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
function viewAllEmployees() {
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
function viewEmpByDept() {
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
function viewEmpByMngr() {
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


// Use async ... await to handle "Add employees by managers"
async function addEmployees() {
  //import promise client
  const promise = require('mysql2/promise');

  // create the connection
  const connection = await promise.createConnection({ host: 'localhost', user: 'root', database: 'employee_db', password: 'password' });

  //Get the roles and managers for prompt choices 
  let roles = [];
  let managers = [];

  const [roleRes] = await connection.execute("SELECT id, title FROM role r");

  roleRes.forEach(role => roles.push({ name: role.title, value: role.id }));

  const [managerRes] = await connection.execute('SELECT m.id, CONCAT(m.first_name, " ",  m.last_name) AS manager FROM employee m LEFT JOIN employee e ON m.id = e.manager_id WHERE m.manager_id != ? ORDER BY manager ASC', ["null"]);

  managerRes.forEach(manager => managers.push({ name: manager.manager, value: manager.id }));

  // Prompt "Add employees" questions 

  const answer = await prompt([
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
      name: "role",
      type: "list",
      message: "What is the employee's role?",
      choices: roles

    },
    {
      name: "addManagerNot",
      type: "confirm",
      message: "Would you like to add the employee's manager?",
      default: false
    },
    {
      name: "manager",
      type: "list",
      message: "Who is the employee's manager?",
      when: function(answers) {
        return answers.addManagerNot !== false;
      },
      choices: managers
    }
  ])

  if (answer.addManagerNot === false) {
    await connection.execute("INSERT INTO employee (first_name, last_name, role_id) VALUES (?, ?, ?)", [answer.firstName, answer.lastName, answer.role]);
  } else {
    await connection.execute("INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)", [answer.firstName, answer.lastName, answer.role, answer.manager]);
  }
  
  //Notify user 
  term.bgBlue.bold.black("\nAn employee has been added successfully!");
  console.log("\n");
  
  //Start mainMenu 
  start()
}


//Function to handle "Remove employees"
function removeEmployees() {

  //Get employee id and name for prompt's choice
  connection.promise().query('SELECT id, CONCAT(first_name, " ", last_name) AS name FROM employee ORDER BY name ASC')
    .then(([res]) => {

      let employees = [];

      res.forEach(employee => employees.push({ name: employee.name, value: employee.id }));

      //Prompt questions - remove Employee
      prompt({
        name: "empID",
        type: "list",
        message: "Which employee would you like to remove?",
        choices: employees
      }).then(answer => {
        connection.promise().query('DELETE FROM employee WHERE id=?', [answer.empID]);

        //Notify user 
        term.bgYellow.bold.black("\nSelected employee has been removed successfully!");
        console.log("\n");
      })
    });
}


//Function to handle "Update employees"

async function updateEmployees() {

  //import promise client
  const promise = require('mysql2/promise');

  // create the connection
  const connection = await promise.createConnection({ host: 'localhost', user: 'root', database: 'employee_db', password: 'password' });


  let roles = [];
  let employees = [];
  let managers = [];


  const [roleRes] = await connection.execute("SELECT id, title FROM role r");

  const [employeeRes] = await connection.execute('SELECT id, CONCAT(first_name, " ", last_name) AS name FROM employee ORDER BY name ASC')

  const [managerRes] = await connection.execute('SELECT m.id, CONCAT(m.first_name, " ",  m.last_name) AS manager FROM employee m LEFT JOIN employee e ON m.id = e.manager_id WHERE m.manager_id != ? ORDER BY manager ASC', ["null"]);


  roleRes.forEach(role => roles.push({ name: role.title, value: role.id }));

  employeeRes.forEach(employee => employees.push({ name: employee.name, value: employee.id }));

  managerRes.forEach(manager => managers.push({ name: manager.manager, value: manager.id }));


}

function updateEmployees() {

  //Get employee id and name for prompt's choice
  connection.promise().query('SELECT id, CONCAT(first_name, " ", last_name) AS name FROM employee ORDER BY name ASC')
    .then(([res]) => {

      let employees = [];

      res.forEach(employee => employees.push({ name: employee.name, value: employee.id }));

      //Prompt questions - update employee
      prompt({
        name: "empID",
        type: "list",
        message: "Which employee would you like to update?",
        choices: employees
      }).then(answer => {
        connection.promise().query('UPDATE employee SET first_name = ?, last_name = ? WHERE id=?', [answer.empID]);

        //Notify user 
        term.bgYellow.bold.black("\nSelected employee has been removed successfully!");
        console.log("\n");
      });
    });
}












// EXPORT MODULE ===============================================================================================
module.exports = start();