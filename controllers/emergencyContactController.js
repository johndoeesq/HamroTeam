const EmergencyContact = require('../models/EmergencyContactModel');
const AppError = require('../utils/appError.js');
const catchAsync = require('../utils/catchAsync');
const factory = require('./handlerFactory');

//@desc Create new Emergency Contact
//POST api/v1/emergencycontact
//Private
exports.createEmergencyContact = factory.createOne(EmergencyContact);

//@desc  get all Emergency Contact
//GET api/v1/emergencycontact
//Public
exports.getAllEmergencyContact = catchAsync(async (req, res, next) => {
	res.status(200).json(res.allqueryresults);
});

//@desc get single emergency contact
//GET api/v1/emergencycontact/:id
//Public
exports.getEmergencyContact = factory.getOne(EmergencyContact);

//@desc Delete single Emergency Contact
//DELETE api/v1/emergencycontact/:id
//Private
exports.deleteEmergencyContact = factory.deleteOne(EmergencyContact);

//@desc Update Emergency Contact
//PUT api/v1/emergencycontact/:id
//Private
exports.updateEmergencyContact = factory.updateOne(EmergencyContact);
