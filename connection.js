// IMPORT MYSQL PACKAGE ================================================================================

const mysql = require("mysql");

// create the connection information for the sql database
const con = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "password",
  database: "employee_db"
});

// connect the mysql server and sql database
con.connect(function(err) {
  if (err) throw err;
  console.log("mysql connected: ", con.threadId);
  con.end();
  // run the start function after the connection is made to prompt the user
  // start();
});


// EXPORT MYSQL MODULE ================================================================================

module.exports = con;