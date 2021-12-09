const express = require('express');
const payrollController = require('../controllers/payrollController');
const allqueryresults = require('../middleware/allqueryresults');
const Payroll = require('../models/PayrollModel');
const authController = require('../controllers/authController');
const { checkEmployeeAccess } = require('../middleware/checkEmployeeAccess');
const router = express.Router();

router
	.route('/')
	.get(
<<<<<<< HEAD
		allqueryresults(Payroll),
=======
		allqueryresults(Payroll, {
			path: 'benefits',
			select:
				'accomodation transport gadgets insurance lunch_fare transport_fare miscellaneous_fare',
		}),
>>>>>>> d7cc6475b80a5aac987786bbe1150ac8361348ff
		authController.protect,
		authController.restrictTo('admin'),
		payrollController.getAllPayroll,
	)
	.post(
		authController.protect,
		authController.restrictTo('admin'),
		payrollController.createPayroll,
	);

router
	.route('/:id')
	.get(
		authController.protect,
		authController.restrictToBoth('admin', 'employee'),
		checkEmployeeAccess(Payroll),
		payrollController.getPayroll,
	)
	.put(
		authController.protect,
		authController.restrictTo('admin'),
		payrollController.updatePayroll,
	)
	.delete(
		authController.protect,
		authController.restrictTo('admin'),
		payrollController.deletePayroll,
	);

module.exports = router;
