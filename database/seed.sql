/* Seeds DB with Dummy Data */
USE EmployeeRecords;

INSERT INTO employees (name, department, salary, email, status)
VALUES
    ('Jane Smith', 'Finance', 82000.0, 'a@test.com', 'active'),
    ('John Doe', 'Engineering', 95000.0, 'johndoe@test.com', 'active');