
const Employee = require('../models/employeeModel');

exports.getAllEmployees = async (req, res, next) => {
    try {
        const employees = await Employee.findAll({
            where: { status: 'active'}
        });
        res.status(200).json(employees);
    } catch (error) {
        res.status(400).json({ Message: "Bad Request"  });
    }
}

exports.createEmployee = async (req, res, next) => {
    try {
        res.status(200).json({ Message: "Employee Created"  });
    } catch (error) {
        res.status(400).json({ Message: "Bad Request"  });
    }
}

exports.getEmployeeById = async (req, res, next) => {
    try {
        res.status(200).json({ Message: "Employee retrieved"  });
    } catch (error) {
        res.status(400).json({ Message: "Bad Request"  });
    }
}

exports.replaceEmployee = async (req, res, next) => {
    try {
        res.status(200).json({ Message: "Employee replaced"  });
    } catch (error) {
        res.status(400).json({ Message: "Bad Request"  });
    }
}

exports.updateEmployee = async (req, res, next) => {
    try {
        res.status(200).json({ Message: "Employee updated"  });
    } catch (error) {
        res.status(400).json({ Message: "Bad Request"  });
    }
}

exports.updateEmployeeStatus = async (req, res, next) => {
    try {
        res.status(200).json({ Message: "Employee status updated"  });
    } catch (error) {
        res.status(400).json({ Message: "Bad Request"  });
    }
}

exports.deleteEmployee = async (req, res, next) => {
    try {
        res.status(200).json({ Message: "Employee Deleted"  });
    } catch (error) {
        res.status(400).json({ Message: "Bad Request"  });
    }
}
