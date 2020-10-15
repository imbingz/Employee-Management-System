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
    createRole: async ({ roleName, salary, departmentId }) => {
      return (await connection.query("INSERT INTO role SET ?", { title: roleName, salary: salary, department_id: departmentId }))[0];
    },
    createDepartment: async ({ deptName }) => {
      return (await connection.query("INSERT INTO department SET ?", { name: deptName }))[0];
    },
    updateEmpManager: async ({ managerId , employeeId }) => {
      return (await connection.query("UPDATE employee SET ? WHERE ?", [{ manager_id: managerId }, { id: employeeId }]))[0];
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
        choices: ["View All Employees", "View All Departments", "View All Roles", "Add Employees", "Add Roles", "Add Departments", "Update Employee Role", "Update employee Manager", "View Employees by Managers", "Delete Employees", "Delete Departments", "Delete Roles", "View Department's Utilized Budget", "Exit"]
      }
    );
    
    // Handle Each Task 
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
        {
          const [roles, employees] = await Promise.all([db.getRoles(), db.getEmployees()]);
          const answers = await inquirer.prompt([
            {
              name: "firstName",
              type: "input",
              message: "What is the employee's First Name?",
              validate: (name) => /^[a-zA-ZäöüßÄÖÜ]+$/.test(name) || 'Please enter a valid name.'
            },
            {
              name: "lastName",
              type: "input",
              message: "What is the employee's Last Name?",
              validate: (name) => /^[a-zA-ZäöüßÄÖÜ]+$/.test(name) || 'Please enter a valid name.'
            },
            {
              name: "roleId",
              type: "list",
              message: "What is the employee's role?",
              // roles.map((role) => ({name:role.title, value: role.id}))
              choices: roles.map(({ id, title }) => ({ name: title, value: id }))
            },
            {
              name: "shouldAddManager",
              type: "confirm",
              message: "Would you like to add the employee's manager?",
              default: false
            },
            {
              // when: (answers) => answers.shouldAddManager,
              when: ({ shouldAddManager }) => shouldAddManager,
              name: "managerId",
              type: "list",
              message: "Who is the employee's manager?",
              // when: function(answers) {
              //   return answers.addManagerNot !== false;
              // },
              choices: employees.map(({ id, first_name, last_name }) => ({ name: `${first_name} ${last_name}`, value: id }))
            }
          ]);

          //Update database
          const newEmployee = await db.createEmployee(answers);

          //Notify user 
          term.bgBlue.bold.black("\nAn employee has been added successfully!");
          console.log("\n");
          break;    
        }
      case "Add Roles":
        {
          const departments = await db.getDepartments();
          const answers = await inquirer.prompt([
            {
              name: "departmentId",
              type: "list",
              message: "Which department would you like to add the role to?",
              // roles.map((role) => ({name:role.title, value: role.id}))
              choices: departments.map(({ id, name }) => ({ name: name, value: id }))
            },
            {
            name: "roleName",
            type: "input",
            message: "What is the role you would like to add?",
            },
            {
              name: "salary",
              type: "input",
              message: "What is the annual salary for this role?",
              validate: (salary) => !isNaN(salary) && /^[0-9]+$/.test(salary) || 'Please enter a valid number.'
            }
          ])

          const newRole = await db.createRole(answers);

          //Notify user 
          term.bgBlue.bold.black("\nA role has been added successfully!");
          console.log("\n");
          break; 

        }
      case "Add Departments":
        {
          const answers = await inquirer.prompt([
            {
              name: "deptName",
              type: "input",
              message: "What is the department you would like to add?"
            }
          ])

          const newDept = await db.createDepartment(answers)

          //Notify user 
          term.bgBlue.bold.black("\nA department has been added successfully!");
          console.log("\n");
          break; 
        }  
      case "Update Employee Role": 
        {
          const [roles, employees] = await Promise.all([db.getRoles(), db.getEmployees()]);

          const answers = await inquirer.prompt([
            {
              name: "employeeId",
              type: "list",
              message: "Choose the employee for whom you would like to update the role",
              choices: employees.map(({ id, first_name, last_name }) => ({ name: `${first_name} ${last_name}`, value: id }))
            },
            {
              name: "roleId",
              type: "list",
              message: "Select a new role for the employee",
              choices: roles.map(({ id, title }) => ({ name: title, value: id }))
            },
          ])

         
          const roleUpdate = await db.updateEmpRole(answers); 

          //Notify user
          term.bgMagenta.bold.black("\nThe employee's role has been updated successfully!");
          console.log("\n");
          break; 

        }
    
      case "Update employee Manager":
        {
          const employees = await db.getEmployees();

          const answers = await inquirer.prompt([
            {
              name: "employeeId",
              type: "list",
              message: "Choose the employee for whom you would like to update the manager",
              choices: employees.map(({ id, first_name, last_name }) => ({ name: `${first_name} ${last_name}`, value: id }))
            },
            {
              name: "managerId",
              type: "list",
              message: "Select a new manager for the employee",
              choices: employees.map(({ id, first_name, last_name }) => ({ name: `${first_name} ${last_name}`, value: id }))
            },
          ]);


          const managerUpdate = await db.updateEmpManager(answers);

          //Notify user
          term.bgMagenta.bold.black("\nThe employee's manager has been updated successfully!");
          console.log("\n");
          break;

        }
      //   updateEmpManager();
      //   break;
      // case "View Employees by Managers":
      //   viewEmpByManagers();
      //   break;
      // case "Delete Employees":
      //   deleteEmployees();
      //   break;
      // case "Delete Departments":
      //   deleteDepartments();
      //   break;
      // case "Delete Roles":
      //   deleteRoles();
      //   break;
      // case "View Department's Utilized Budget":
      //   viewDptBudget();
      //   break;
      // case "Exit":
      //   connection.end();
    };
  };
  connection.end();
})();