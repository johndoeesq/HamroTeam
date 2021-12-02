const express = require('express');
const employeeDataController = require('../controllers/employeeDataController');
const allqueryresults = require('../middleware/allqueryresults');
const EmployeeData = require('../models/EmployeeDataModel');

const router = express.Router();

router
	.route('/')
	.get(
		allqueryresults(EmployeeData),
		employeeDataController.getAllEmployeeData,
	)
	.post(employeeDataController.createEmployeeData);

router
	.route('/:id')
	.get(employeeDataController.getEmployeeData)
	.put(employeeDataController.updateemployeeData)
	.delete(employeeDataController.deleteemployeeData);

module.exports = router;
