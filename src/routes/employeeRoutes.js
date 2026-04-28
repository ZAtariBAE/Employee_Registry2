// Main Router
// Defines /v1 endpoints and attaches controller

const express = require('express');
const router = express.Router();

const employeeController = require('../controllers/employeeController');

/**
 * @swagger
 * components:
 *   schemas:
 *     Employee:
 *       type: object
 *       required:
 *         - name
 *         - department
 *         - salary
 *       properties:
 *         id:
 *           type: integer
 *           description: The auto-generated id of the employee
 *           readOnly: true
 *         name:
 *           type: string
 *         department:
 *           type: string
 *         salary:
 *           type: number
 *         email:
 *           type: string
 *         status:
 *           type: string
 *         created_at:
 *           type: string
 *           format: date-time
 *           readOnly: true
 *         updated_at:
 *           type: string
 *           format: date-time
 *           readOnly: true
 */


/**
 * @swagger
 * /employees:
 *   get:
 *     summary: Retrieve a list of all employees
 *     tags: [Employees]
 *     parameters:
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *           enum: [active, inactive, all]
 *         required: false
 *         description: Filter employees by status
 *     responses:
 *       200:
 *         description: Employees retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Employees retrieved successfully
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Employee'
 *       422:
 *         description: Bad Status
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Invalid status parameter
 *       500:
 *         description: Server Error
 */

router.get('/', employeeController.getAllEmployees);

router.post('/', employeeController.createEmployee);

router.get('/:id', employeeController.getEmployeeById);

router.put('/:id', employeeController.replaceEmployee);

router.patch('/:id', employeeController.updateEmployee)

router.patch('/:id/status', employeeController.updateEmployeeStatus);

router.delete('/:id', employeeController.deleteEmployee);

module.exports = router;