const express = require('express');
const leaveManagementController = require('../controllers/leaveManagementController');
const allqueryresults = require('../middleware/allqueryresults');
const LeaveManagement = require('../models/LeaveManagementModel');
const authController = require('../controllers/authController');

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
		authController.restrictTo('admin'),
		leaveManagementController.createLeaves,
	);

router
	.route('/:id')
	.get(
		authController.protect,
	
		leaveManagementController.getLeaves,
	)
	.put(
		authController.protect,
		authController.restrictTo('admin'),
		leaveManagementController.updateLeaves,
	)
	.delete(
		authController.protect,
		authController.restrictTo('admin', 'employee'),
		leaveManagementController.deleteLeaves,
	);

module.exports = router;
