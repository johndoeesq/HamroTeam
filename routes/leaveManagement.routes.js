const express = require('express');
const leaveManagementController = require('../controllers/leaveManagementController');
const allqueryresults = require('../middleware/allqueryresults');
const LeaveManagement = require('../models/LeaveManagementModel');

const router = express.Router();

router
	.route('/')
	.get(allqueryresults(LeaveManagement), leaveManagementController.getAllLeaves)
	.post(leaveManagementController.createLeaves);

router
	.route('/:id')
	.get(leaveManagementController.getLeaves)
	.put(leaveManagementController.updateLeaves)
	.delete(leaveManagementController.deleteLeaves);

module.exports = router;
