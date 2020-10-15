USE employee_db;

-- DEPARTMENT TABLE
SET SQL_SAFE_UPDATES = 0;
DELETE FROM department;
SET SQL_SAFE_UPDATES = 1;

ALTER TABLE department AUTO_INCREMENT = 1;

INSERT INTO department
	(name)
VALUES
	("Board Member"),
	("Operation"),
	("Finance"),
	("Sales"),
	("HR"),
	("Marketing"),
	("IT"),
	("Legal");


-- ROLE TABLE 
SET SQL_SAFE_UPDATES = 0;
DELETE FROM role;
SET SQL_SAFE_UPDATES = 1;
ALTER TABLE role AUTO_INCREMENT = 1;
INSERT INTO role
	(title, salary, department_id)
VALUES
	("CEO", 300000, 1),
	("CFO", 225000, 3),
	("CMO", 200000, 6),
	("CTO", 250000, 7),
	("COO", 275000, 2),
	("Legal Council", 180000, 8),
	("Account Manager", 150000, 3),
	("Sales Manager", 160000, 4),
	("Salesperson", 95000, 4),
	("Lead Engineer", 160000, 7),
	("HR Manager", 158000, 5),
	("Marketing Manager", 140000, 6),
	("Accountant", 125000, 3),
	("Legal Assistant", 100000, 8),
	("Junior Engineer", 85000, 7),
	("HR Admin", 87000, 5),
	("Social Meida Admin", 75000, 6),
	("Secretary", 65000, 2);



-- EMPLOYEE TABLE 
SET SQL_SAFE_UPDATES = 0;
DELETE FROM employee;
SET SQL_SAFE_UPDATES = 1;
ALTER TABLE employee AUTO_INCREMENT = 1;
INSERT INTO employee
	(first_name, last_name, role_id, manager_id)
VALUES
	("Hazel", "Cole", 1 , null),
	("Peter", "Steek", 2, 1),
	("Saul", "Howard", 3, 1),
	("Nick", "Sol", 4, 1),
	("Mary", "Jane", 5, null),
	("Bret", "Graham", 6, 3),
	("Victor", "Pains", 7, 3),
	("Yoda", "Shiya", 8, 2),
	("Steven", "King", 9, 4),
	("Jon", "Crisma", 10, 1),
	("Mike", "Goodrum", 11, null),
	("Yosih", "Tomaya", 12, 1),
	("Kulas", "Light", 13,null),
	("John", "Smith", 14, 5),
	("Jane", "Doe", 15,7),
	("Ervin", "Howell", 16,4),
	("Darcy", "Goodwill", 17, null),
	("Yo", "Shi", 18, 8);


-- SELF JOIN - SET MANAGER_ID 
-- SELECT
-- 	e.id,
-- 	e.first_name,
-- 	e.last_name,
-- 	e.role_id,
-- 	CONCAT(m.first_name, " " m.last_name) AS manager
-- FROM employee e
-- 	LEFT JOIN employee m ON m.id = e.manager_id
-- ORDER BY manager DESC;
