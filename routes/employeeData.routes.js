const express = require('express');
const employeeDataController = require('../controllers/employeeDataController');
const allqueryresults = require('../middleware/allqueryresults');
const EmployeeData = require('../models/EmployeeDataModel');
const authController = require('../controllers/authController');
const { checkEmployeeAccess } = require('../middleware/checkEmployeeAccess');

const router = express.Router();

router
	.route('/')
	.get(
		allqueryresults(EmployeeData),
		authController.protect,
		authController.restrictTo('admin'),
		employeeDataController.getAllEmployeeData,
	)
	.post(
		authController.protect,
		authController.restrictTo('admin'),
		employeeDataController.createEmployeeData,
	);

router
	.route('/:id')
	.get(
		authController.protect,
		authController.restrictToBoth('admin', 'employee'),
		checkEmployeeAccess(EmployeeData),
		employeeDataController.getEmployeeData,
	)
	.put(
		authController.protect,
		authController.restrictTo('admin'),

		employeeDataController.updateemployeeData,
	)
	.delete(
		authController.protect,
		authController.restrictTo('admin'),
		employeeDataController.deleteemployeeData,
	);

module.exports = router;
