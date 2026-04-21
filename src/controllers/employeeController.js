
const Employee = require('../models/employeeModel');

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
        res.status(200).json(employees);
    } catch (error) {
        res.status(500).json({ Message: "Database error"  });
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
        const employeeId = req.params.id;
        const employees = await Employee.findAll({
            where: { id: employeeId}
        });

        res.status(200).json(employees);
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
