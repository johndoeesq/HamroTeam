const express = require('express');
const emergencyContactController = require('../controllers/emergencyContactController');
const allqueryresults = require('../middleware/allqueryresults');
const EmergencyContact = require('../models/EmergencyContactModel');

const router = express.Router();

router
	.route('/')
	.get(
		allqueryresults(EmergencyContact),
		emergencyContactController.getAllEmergencyContact,
	)
	.post(emergencyContactController.createEmergencyContact);

router
	.route('/:id')
	.get(emergencyContactController.getEmergencyContact)
	.put(emergencyContactController.updateEmergencyContact)
	.delete(emergencyContactController.deleteEmergencyContact);

module.exports = router;
