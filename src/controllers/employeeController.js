const Employee = require('../models/employeeModel');

exports.getAllEmployees = async (req, res, next) => {
    try {
        const employees = await Employee.findAll(req.query.status);
        res.status(200).json({ data: employees });
    } catch (error) {
        next(error);
    }
};


};