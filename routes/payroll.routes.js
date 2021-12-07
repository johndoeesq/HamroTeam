const express = require('express');
const payrollController = require('../controllers/payrollController');
const allqueryresults = require('../middleware/allqueryresults');
const Payroll = require('../models/PayrollModel');
const authController = require('../controllers/authController');
const router = express.Router();

router
	.route('/')
	.get(
		allqueryresults(Payroll),
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
		authController.restrictTo('admin', 'employee'),
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
