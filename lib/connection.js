// IMPORT MYSQL PACKAGE ================================================================================

const mysql = require("mysql");
const start = require('../server.js')

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
  
  //Call the start() on server.js
  start;
});


// EXPORT MYSQL MODULE ================================================================================

module.exports = con;