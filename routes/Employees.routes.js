const express = require('express');
const employeesController = require('../controllers/employeesController');
const allqueryresults = require('../middleware/allqueryresults');
const router = express.Router();
const Employee = require('../models/EmployeesModel');
const authController = require('../controllers/authController');

router
	.route('/')
	.get(
		allqueryresults(Employee),
		authController.protect,
		authController.restrictTo('admin'),
		employeesController.getAllEmployees,
	)
	.post(
		authController.protect,
		authController.restrictTo('admin'),
		employeesController.createEmployees,
	);

router
	.route('/:id')
	.get(
		authController.protect,
		authController.restrictTo('admin'),
		employeesController.getEmployee,
	)
	.put(
		authController.protect,
		authController.restrictTo('admin'),
		employeesController.updateemployee,
	)
	.delete(
		authController.protect,
		authController.restrictTo('admin'),
		employeesController.deleteemployee,
	);

module.exports = router;
