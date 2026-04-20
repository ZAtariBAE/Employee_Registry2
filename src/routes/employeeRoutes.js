// Main Router
// Defines /v1 endpoints and attaches controller

const express = require('express');
const router = express.Router();

const employeeController = require('../controllers/employeeController');

router.get('/', employeeController.getAllEmployees);

router.post('/', employeeController.createEmployee);

router.get('/:id', employeeController.getEmployeeById);

router.put('/:id', employeeController.replaceEmployee);

router.patch('/:id', employeeController.updateEmployee)

router.patch('/:id/status', employeeController.updateEmployeeStatus);

router.delete('/:id', employeeController.deleteEmployee);

module.exports = router;