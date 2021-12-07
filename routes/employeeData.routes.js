const express = require('express');
const employeeDataController = require('../controllers/employeeDataController');
const allqueryresults = require('../middleware/allqueryresults');
const EmployeeData = require('../models/EmployeeDataModel');
const authController = require('../controllers/authController');

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
		employeeDataController.uploadEmployeePhoto,
		employeeDataController.resizeEmployeePhoto,
		employeeDataController.createEmployeeData,
	);

router
	.route('/:id')
	.get(
		authController.protect,
		authController.restrictTo('admin', 'employee'),
		employeeDataController.getEmployeeData,
	)
	.put(
		authController.protect,
		authController.restrictTo('admin'),
		employeeDataController.uploadEmployeePhoto,
		employeeDataController.resizeEmployeePhoto,
		employeeDataController.updateemployeeData,
	)
	.delete(
		authController.protect,
		authController.restrictTo('admin'),
		employeeDataController.deleteemployeeData,
	);

module.exports = router;
