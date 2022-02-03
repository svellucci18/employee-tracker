INSERT INTO department (id, department)
VALUES (1, "Sales"),
       (2, "Engineering"),
       (3, "Finance"),
       (4, "Legal");

       
INSERT INTO role (id, role, department, salary)
VALUES (1, "Sales Lead", 1, 100000),
       (2, "Salesperson", 1, 80000),
       (3, "Lead Engineer", 2, 150000),
       (4, "Software Engineer", 2, 120000),
       (5, "Account Manager", 3, 160000),
       (6, "Accountant", 3, 125000),
       (7, "Legal Team Lead", 4, 250000),
       (8, "Lawyer", 4, 190000);

INSERT INTO employee (id, first_name, last_name, role, manager)
VALUES (1, "Michelle", "Doe", 1, null),
       (2, "Sarah", "Chan", 2, 1),
       (3, "Ashley", "Rodriguez", 3, null),
       (4, "Kiesha", "Tupik", 4, 3),
       (5, "Malia", "Singh", 5, null),
       (6, "Shae", "Brown", 6, 5),
       (7, "Sophia", "Lourd", 7, null),
       (8, "Char", "Allen", 8, 7);