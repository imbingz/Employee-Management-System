DROP DATABASE IF EXISTS employee_db;
CREATE DATABASE employee_db;
USE employee_db;

-- CREATE TABLE department 
DROP TABLE IF EXISTS department;
CREATE TABLE department(
    id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(30) NOT NULL,
    PRIMARY KEY(id)
);

-- CREATE TABLE role
DROP TABLE IF EXISTS role;
CREATE TABLE role(
    id INT NOT NULL AUTO_INCREMENT,
    department_id INT NOT NULL,
    title VARCHAR(30) NOT NULL,
    salary DECIMAL,
    PRIMARY KEY(id),
    INDEX idx_department (department_id),
    CONSTRAINT fk_role_department FOREIGN KEY (department_id)
        REFERENCES department (id)
        ON UPDATE CASCADE
        ON DELETE CASCADE
);

-- CREATE TABLE employee
DROP TABLE IF EXISTS employee;
CREATE TABLE employee(
    id INT NOT NULL AUTO_INCREMENT,
    role_id INT NOT NULL,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    manager_id INT DEFAULT NULL,
    PRIMARY KEY(id),
    INDEX idx_role (role_id),
    INDEX idx_manager (manager_id),
    CONSTRAINT fk_emplpoyee_role FOREIGN KEY (role_id)
        REFERENCES role (id)
        ON UPDATE CASCADE
        ON DELETE CASCADE,
    CONSTRAINT fk_emplpoyee_manager FOREIGN KEY (manager_id)
        REFERENCES employee (id)
        ON UPDATE CASCADE
        ON DELETE CASCADE
);