const express = require('express');
const payrollController = require('../controllers/payrollController');
const allqueryresults = require('../middleware/allqueryresults');
const Payroll = require('../models/PayrollModel');

const router = express.Router();

router
	.route('/')
	.get(allqueryresults(Payroll), payrollController.getAllPayroll)
	.post(payrollController.createPayroll);

router
	.route('/:id')
	.get(payrollController.getPayroll)
	.put(payrollController.updatePayroll)
	.delete(payrollController.deletePayroll);

module.exports = router;
