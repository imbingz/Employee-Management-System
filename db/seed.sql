USE employee_db;

-- DEPARTMENT TABLE
SET SQL_SAFE_UPDATES = 0;
DELETE FROM department;
SET SQL_SAFE_UPDATES = 1;

ALTER TABLE department AUTO_INCREMENT = 1;

INSERT INTO department
	(name)
VALUES
	("Finance"),
	("Sales"),
	("HR"),
	("Marketing"),
	("Engineer"),
	("Legal");


-- ROLE TABLE 
SET SQL_SAFE_UPDATES = 0;
DELETE FROM role;
SET SQL_SAFE_UPDATES = 1;
ALTER TABLE role AUTO_INCREMENT = 1;
INSERT INTO role
	(department_id, title, salary)
VALUES
	(1, "Accountant", 125000),
	(1, "Account Manager", 150000),
	(2, "Salesperson", 95000),
	(2, "Sales Manager", 160000),
	(3, "HR Admin", 87000),
	(3, "HR Manager", 158000),
	(4, "Social Meida Admin", 75000),
	(4, "Marketing Manager", 140000),
	(5, "Junior Engineer", 85000),
	(5, "Lead Engineer", 160000),
	(6, "Legal Council", 180000),
	(6, "Legal Assistant", 100000);


-- EMPLOYEE TABLE 
SET SQL_SAFE_UPDATES = 0;
DELETE FROM employee;
SET SQL_SAFE_UPDATES = 1;
ALTER TABLE employee AUTO_INCREMENT = 1;
INSERT INTO employee
	(role_id, first_name, last_name, manager_id)
VALUES
	(1, "Yo", "Shi", 2),
	(2, "Yoda", "Shiya", null),
	(3, "Yosih", "Tomaya", null),
	(4, "Bret", "Graham", null),
	(5, "Kulas", "Light", 4),
	(6, "John", "Smith", null),
	(7, "Mary", "Jane", 6),
	(8, "Jane", "Doe", null),
	(9, "Victor", "Pains", 8),
	(10, "Ervin", "Howell", null),
	(11, "Ana", "Goodwill", null),
	(12, "Roma", "Crona", 11);


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
