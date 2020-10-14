async function main() {
  // import mysql2/promise 
  const mysql = require('mysql2/promise');

  // create the connection
  const connection = await mysql.createConnection({ host: 'localhost', user: 'root', database: 'employee_db', password: 'password' });

  console.log("connected");
}

main();