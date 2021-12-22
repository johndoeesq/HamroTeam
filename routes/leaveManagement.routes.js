const express = require('express');
const leaveManagementController = require('../controllers/leaveManagementController');
const allqueryresults = require('../middleware/allqueryresults');
const LeaveManagement = require('../models/LeaveManagementModel');
const authController = require('../controllers/authController');
const { checkEmployeeAccess } = require('../middleware/checkEmployeeAccess');

const router = express.Router();

router
	.route('/')
	.get(
		allqueryresults(LeaveManagement),
		authController.protect,
		authController.restrictTo('admin'),
		leaveManagementController.getAllLeaves,
	)
	.post(
		authController.protect,
		authController.restrictTo('employee'),
		leaveManagementController.createLeaves,
	);

router
	.route('/:id')
	.get(
		authController.protect,
		authController.restrictToBoth('admin', 'employee'),
		checkEmployeeAccess(LeaveManagement),
		leaveManagementController.getLeaves,
	)
	.put(
		authController.protect,
		authController.restrictToBoth('admin', 'employee'),
		checkEmployeeAccess(LeaveManagement),
		leaveManagementController.updateLeaves,
	)
	.delete(
		authController.protect,
		authController.restrictToBoth('admin', 'employee'),
		checkEmployeeAccess(LeaveManagement),
		leaveManagementController.deleteLeaves,
	);

module.exports = router;
