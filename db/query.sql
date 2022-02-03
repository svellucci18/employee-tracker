SELECT *
FROM role

LEFT JOIN department ON role.department = department.id;

SELECT *
FROM employee

LEFT JOIN role ON employee.role = role.id
LEFT JOIN department ON role.department = department.id;