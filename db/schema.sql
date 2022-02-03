DROP DATABASE IF EXISTS employees;

CREATE DATABASE employees;

USE employees;

CREATE TABLE department ( -- how to hide index?
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  department VARCHAR(30) NOT NULL
);

CREATE TABLE role (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  role VARCHAR(30) NOT NULL,
  salary DECIMAL NOT NULL,
  department INT,
  FOREIGN KEY (department)
  REFERENCES department(id)
  ON DELETE SET NULL
);

CREATE TABLE employee (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  first_name VARCHAR(30),
  last_name VARCHAR(30),
  role INT,
  FOREIGN KEY (role)
  REFERENCES role(id)
  ON DELETE SET NULL,
  manager INT,
  FOREIGN KEY (manager)
  REFERENCES employee(id)
);

