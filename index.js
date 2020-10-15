// IMPORT PACKAGES AND MODULES =============================================================================================

const msql = require('mysql2/promise');
const inquirer = require('inquirer');
const term = require("terminal-kit").terminal;
require('console.table');

const startDisplay = require('./lib/starter');

// DISPLAY EMPLOYEE TRACKER WHEN STARTING THE APP =============================================================================================

// startDisplay();


// WRAP EVERYTHING IN ASYNC AWAIT FUNCTION =============================================================================================

(async () => {
  //conncect to database 
  const connection = await msql.createConnection({ host: 'localhost', user: 'root', database: 'employee_db', password: 'password' });

  //reusable functions 
  const db = {
    getDepartments: async () => {
      return (await connection.query("SELECT * from department"))[0];
    },
    getRoles: async () => {
      return (await connection.query("SELECT * from role"))[0];
    },
    getEmployees: async () => {
      return (await connection.query("SELECT * from employee"))[0];
    },
    createEmployee: async ({ firstName, lastName, roleId, managerId }) => {
      return (await connection.query("INSERT INTO employee SET ?", { first_name: firstName, last_name: lastName, role_id: roleId, manager_id: managerId }))[0];
    },
  };

  let shouldQuit = false;

  while (!shouldQuit) {

    // Main Menu
    const { task } = await inquirer.prompt(
      {
        name: "task",
        type: "list",
        message: "What would you like to do?",
        choices: ["View All Employees", "View All Departments", "View All Roles", "Add Employees", "Add Roles", "Add Departments", "Update Employee's Roles", "Update employee Manager", "View Employees by Managers", "Delete Employees", "Delete Departments", "Delete Roles", "View Department's Utilized Budget", "Exit"]
      }
    );
    
    // Each task 
    switch (task) {
      case "View All Employees":
        {
        //employees is the first index of returned data 
        const employees = await db.getEmployees();
        console.table("\n", employees, "\n");
        console.log("\n");
        break;
        }
      case "View All Departments":
        {
          const departments = await db.getDepartments();
          console.table("\n", departments, "\n");
          console.log("\n");
          break;
        }
      case "View All Roles":
        {
          const roles = await db.getRoles();
          console.table("\n", roles, "\n");
          console.log("\n");
          break;
        }
      case "Add Employees":
        addEmployees();
        break;
      case "Add Roles":
        addRoles();
        break;
      case "Add Departments":
        addDepartments();
        break;
      case "Update Employee's Roles":
        updateEmpRoles();
        break;
      case "Update employee Manager":
        updateEmpManager();
        break;
      case "View Employees by Managers":
        viewEmpByManagers();
        break;
      case "Delete Employees":
        deleteEmployees();
        break;
      case "Delete Departments":
        deleteDepartments();
        break;
      case "Delete Roles":
        deleteRoles();
        break;
      case "View Department's Utilized Budget":
        viewDptBudget();
        break;
      case "Exit":
        connection.end();
    };
  };
  connection.end();
})();