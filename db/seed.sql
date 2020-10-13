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
	("Accountant", 125000, 3),
	("Account Manager", 150000, 3),
	("Salesperson", 95000, 4),
	("Sales Manager", 160000, 4),
	("Secretary", 65000, 2),
	("HR Admin", 87000, 5),
	("HR Manager", 158000, 5),
	("Social Meida Admin", 75000, 6),
	("Marketing Manager", 140000, 6),
	("Junior Engineer", 85000, 7),
	("Lead Engineer", 160000, 7),
	("Legal Council", 180000, 8),
	("Legal Assistant", 100000, 8),
	("CFO", 225000, 3),
	("CMO", 200000, 6),
	("CTO", 250000, 7),
	("CEO", 300000, 1),
	("COO", 275000, 2);


-- EMPLOYEE TABLE 
SET SQL_SAFE_UPDATES = 0;
DELETE FROM employee;
SET SQL_SAFE_UPDATES = 1;
ALTER TABLE employee AUTO_INCREMENT = 1;
INSERT INTO employee
	(first_name, last_name, role_id, manager_id)
VALUES
	("Hazel", "Cole", 17 , null),
	("Yo", "Shi", 1, null),
	("Yoda", "Shiya", 2, null),
	("Yosih", "Tomaya", 3, null),
	("Bret", "Graham", 4, null),
	("Kulas", "Light", 5, 4),
	("John", "Smith", 6, null),
	("Mary", "Jane", 7, 6),
	("Jane", "Doe", 8, null),
	("Victor", "Pains", 9, 8),
	("Ervin", "Howell", 10, null),
	("Darcy", "Goodwill", 11, null),
	("Steven", "King", 11, 17),
	("Jon", "Crisma", 12, 17),
	("Mike", "Goodrum", 13, 17),
	("Peter", "Steek", 14, 17),
	("Saul", "Howard", 15, 17),
	("Nick", "Sol", 16, 17);



-- SELF JOIN - SET MANAGER_ID 
-- SELECT
-- 	e.id,
-- 	e.role_id,
-- 	e.first_name,
-- 	e.last_name,
-- 	m.manager_id,
-- 	CONCAT(m.first_name, m.last_name) AS manager
-- FROM employee e
-- 	LEFT JOIN employee m ON e.id = m.manager_id;
