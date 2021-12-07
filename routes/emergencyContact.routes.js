const express = require('express');
const emergencyContactController = require('../controllers/emergencyContactController');
const allqueryresults = require('../middleware/allqueryresults');
const EmergencyContact = require('../models/EmergencyContactModel');
const authController = require('../controllers/authController');
const router = express.Router();

router
	.route('/')
	.get(
		authController.protect,
		authController.restrictTo('admin'),
		allqueryresults(EmergencyContact),
		emergencyContactController.getAllEmergencyContact,
	)
	.post(
		authController.protect,
		authController.restrictTo('admin'),
		emergencyContactController.createEmergencyContact,
	);

router
	.route('/:id')
	.get(
		authController.protect,
		authController.restrictTo('admin', 'employee','project_manager'),
		emergencyContactController.getEmergencyContact,
	)
	.put(
		authController.protect,
		authController.restrictTo('admin'),
		emergencyContactController.updateEmergencyContact,
	)
	.delete(
		authController.protect,
		authController.restrictTo('admin'),
		emergencyContactController.deleteEmergencyContact,
	);

module.exports = router;
