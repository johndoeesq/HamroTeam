const EmergencyContact = require('../models/EmergencyContactModel');
const AppError = require('../utils/appError.js');
const catchAsync = require('../utils/catchAsync');
const factory = require('./handlerFactory');

//@desc Create new Emergency Contact
//POST api/v1/emergencycontact
//Private
exports.createEmergencyContact = catchAsync(async (req, res, next) => {
	emergencyContact = await EmergencyContact.create(req.body);
	res.status(201).json({ status: 'success', data: emergencyContact });
});

//@desc  get all Emergency Contact
//GET api/v1/emergencycontact
//Public
exports.getAllEmergencyContact = catchAsync(async (req, res, next) => {
	res.status(200).json(res.allqueryresults);
});

//@desc get single emergency contact
//GET api/v1/emergencycontact/:id
//Public
exports.getEmergencyContact = catchAsync(async (req, res, next) => {
	const emergencyContact = await EmergencyContact.findById(req.params.id);

	if (!emergencyContact) {
		return next(new AppError('No EmergencyContact found with that id', 404));
	}
	res.status(200).json({ status: 'success', data: { emergencyContact } });
});

//@desc Delete single Emergency Contact
//DELETE api/v1/emergencycontact/:id
//Private
exports.deleteEmergencyContact = factory.deleteOne(EmergencyContact);

//@desc Update Emergency Contact
//PUT api/v1/emergencycontact/:id
//Private
exports.updateEmergencyContact = factory.updateOne(EmergencyContact);
