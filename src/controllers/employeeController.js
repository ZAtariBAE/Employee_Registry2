
const Employee = require('../models/employeeModel');
const {validateAllEmployeeData, validateRequiredFields} = require('../middleware/validateBody');

exports.getAllEmployees = async (req, res, next) => {
    try {
        const StatusQuery = (req.query.status || 'active').toLowerCase();
        let whereCondition = {};

        if (StatusQuery === 'active' || StatusQuery === 'inactive') {
            whereCondition.status = StatusQuery;
        } else if (StatusQuery === 'all') {
            whereCondition.status = ['active', 'inactive'];
        } else {
            return res.status(422).json({message: 'Invalid Parameter'})
        }
        const employees = await Employee.findAll({
            where: whereCondition
        });
        res.status(200).json({
            Message: "Employee created",
            Data: employees
        });
    } catch (error) {
        res.status(500).json({ Message: "Database error"  });
    }
}

exports.createEmployee = async (req, res, next) => {
    try {
        // Request Validation
        const presenceErrors = validateRequiredFields(['name', 'department', 'salary'], req.body);
        let validationErrors = (presenceErrors.length > 0) ? presenceErrors : validateAllEmployeeData(req.body);
        if (validationErrors.length > 0) {
            return res.status(422).json({
                message: "Validation Error.",
                errors: validationErrors
            })
        }

        // SQL Actions
        const {name, department, salary, email} = req.body;
        const newEmployee = await Employee.create ({
            name,
            department,
            salary,
            email
        });
        res.status(201).json({
            Message: "Employee created",
            Data: newEmployee
        });

    } catch (error) {
        res.status(500).json({ Message: error.message });
    }
}

exports.getEmployeeById = async (req, res, next) => {
    try {
        const employeeId = req.params.id;
        const employees = await Employee.findAll({
            where: { id: employeeId}
        });
        res.status(200).json({
            Message: "Employee created",
            Data: employees
        });
    } catch (error) {
        res.status(400).json({ Message: "Bad Request"  });
    }
}

exports.replaceEmployee = async (req, res, next) => {
    try {
        const employeeId = req.params.id;
        const { name, department, salary, email } = req.body;

        const employee = await Employee.findByPk(employeeId);
        if (!employee) {
            return res.status(404).json({
                message:  'Employee Not Found'
            }); 
        }

        const validationErrors = validateAllEmployeeData(name, department, salary, email)
        if (validationErrors.length > 0) {
            return res.status(422).json({
                message: "Validation Error.",
                errors: validationErrors
            })
        }

        await employee.update({
            name,
            department,
            salary,
            email: email || null
        });

        res.status(200).json({ 
            Message: "Employee replaced",
            Data: employee
          });
    } catch (error) {
        res.status(400).json({ Message: "Bad Request"  });
    }
}

exports.updateEmployee = async (req, res, next) => {
    try {
        const employeeId = req.params.id;
        const employee = await Employee.findByPk(employeeId);

        if (!employee) {
            return res.status(404).json({
                message: "employee not found"
            });
        }

        const {name, department, salary, email} = req.body;

        const updates = {};

        if (name !== undefined) updates.name = name;
        if (department !== undefined) updates.department = department;
        if (salary !== undefined) updates.salary = salary;
        if (email !== undefined) updates.email = email;

        if (Object.keys(updates).length===0) {
           res.status(400).json({ 
            Message: "Empty Request",
          }); 
        }

        await employee.update(updates);

        res.status(200).json({ 
            Message: "Employee updated",
            Data: employee
          });
    } catch (error) {
        res.status(400).json({ Message: "Bad Request"  });
    }
}

exports.updateEmployeeStatus = async (req, res, next) => {
    try {
        const employeeId = req.params.id;
        let status = req.body.status

        const employee = await Employee.findByPk(employeeId);

        if (!employee) {
            return res.status(404).json({
                message: "employee not found"
            });
        }

        const statusOptions = ["active", "inactive"];

        if (!status) {
            return res.status(422).json ({
                message: "Missing required fields"
            });
        }

        status = status.toLowerCase();

        if (!statusOptions.includes(status)) {
            return res.status(422).json ({
                message: `${status} is not a Status`
            });
        }

        await employee.update({status: status});
        res.status(200).json({ 
            Message: "Employee updated",
            Data: employee
          });
    } catch (error) {
        res.status(400).json({ Message: "Bad Request"  });
    }
}

exports.deleteEmployee = async (req, res, next) => {
    try {
        const employeeId = req.params.id;
        const RowsAffected = await Employee.destroy({
            where: { id: employeeId}
        });
        if (RowsAffected === 0) {
            return res.status(404).json({ message: "Employee not found." });
        }
        res.status(204).send();
    } catch (error) {
        res.status(400).json({ Message: "Bad Request"  });
    }
}
