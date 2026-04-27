
const Employee = require('../models/employeeModel');
const {validateAllEmployeeData, validateRequiredFields} = require('../middleware/validateBody');
const { raw } = require('express');

exports.getAllEmployees = async (req, res, next) => {
    try {

        // Validator
        const statusQuery = (req.query.status || 'active').toLowerCase();
        const allowedStatuses = ['active', 'inactive', 'all'];
        if (!allowedStatuses.includes(statusQuery)) {
            return res.status(422).json({ message: 'Invalid status parameter' });
        }

        let whereCondition = {};
        if (statusQuery !== 'all') {
            whereCondition.status = statusQuery;
        }

        // SQL
        const employee = await Employee.findAll({
            where: whereCondition
        });
        return res.status(200).json({
            message: "Employees retrieved successfully",
            data: employee
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

exports.createEmployee = async (req, res, next) => {
    try {
        // Validation
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
            message: "Employee created",
            data: newEmployee
        });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

exports.getEmployeeById = async (req, res, next) => {
    try {
        const employeeId = req.params.id;
        const employee = await Employee.findByPk(employeeId);
        if (!employee) {
            return res.status(404).json({
                message: "Employee not found"
            });
        }


        res.status(200).json({
            message: "Employee created",
            data: employee
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

exports.replaceEmployee = async (req, res, next) => {
    try {
        // Validation
        const employeeId = req.params.id;
        const employee = await Employee.findByPk(employeeId);
        if (!employee) {
            return res.status(404).json({
                message:  'Employee Not Found'
            }); 
        }

        const presenceErrors = validateRequiredFields(['name', 'department', 'salary'], req.body);
        let validationErrors = (presenceErrors.length > 0) ? presenceErrors : validateAllEmployeeData(req.body);
        if (validationErrors.length > 0) {
            return res.status(422).json({
                message: "Validation Error.",
                errors: validationErrors
            })
        }

        // SQL Actions
        const { name, department, salary, email } = req.body;
        await employee.update({
            name,
            department,
            salary,
            email: email || null
        });
        res.status(200).json({ 
            message: "Employee replaced",
            data: employee
          });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

exports.updateEmployee = async (req, res, next) => {
    try {

        // Validator  
        const employeeId = req.params.id;
        const employee = await Employee.findByPk(employeeId);
        if (!employee) {
            return res.status(404).json({
                message: "employee not found"
            });
        }

        const validationErrors = validateAllEmployeeData(req.body);
        if (validationErrors.length > 0) {
            return res.status(422).json({
                message: "Validation Error.",
                errors: validationErrors
            })
        }

        const {name, department, salary, email} = req.body;
        const rawData = {name, department, salary, email};
        let updates = {};
        for (const key in rawData) {
            if (rawData[key] !== undefined) {
                updates[key] = rawData[key];
            }
        }

        if (Object.keys(updates).length === 0) {
            return res.status(422).json({ 
                message: "Update fields are empty." 
            });
        }

        // SQL
        await employee.update(updates);
        res.status(200).json({ 
            message: "Employee updated",
            data: employee
          });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

exports.updateEmployeeStatus = async (req, res, next) => {
    try {
        
        // Validator
        const employeeId = req.params.id;
        const employee = await Employee.findByPk(employeeId);
        if (!employee) {
            return res.status(404).json({
                message: "employee not found"
            });
        }

        const presenceErrors = validateRequiredFields(['status'], req.body);
        let validationErrors = (presenceErrors.length > 0) ? presenceErrors : validateAllEmployeeData(req.body);
        if (validationErrors.length > 0) {
            return res.status(422).json({
                message: "Validation Error.",
                errors: validationErrors
            })
        }

        // SQL
        const { status } = req.body;
        await employee.update({ status });
        res.status(200).json({ 
            message: "Employee updated",
            data: employee
          });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

exports.deleteEmployee = async (req, res, next) => {
    try {
        const employeeId = req.params.id;
        const rowsAffected = await Employee.destroy({
            where: { id: employeeId}
        });
        if (rowsAffected === 0) {
            return res.status(404).json({ message: "Employee not found." });
        }
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
