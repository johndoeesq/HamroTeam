const LeaveManagement = require('../models/LeaveManagementModel');
const AppError = require('../utils/appError.js');
const catchAsync = require('../utils/catchAsync');
const factory = require('./handlerFactory');

//@desc Create new Leave
//POST api/v1/leaves
//Private
exports.createLeaves = factory.createOne(LeaveManagement);

//@desc  get all Leaves
//GET api/v1/leaves
//Public
exports.getAllLeaves = catchAsync(async (req, res, next) => {
	res.status(200).json(res.allqueryresults);
});

//@desc get single Leave
//GET api/v1/leaves/:id
//Public
exports.getLeaves = factory.getOne(LeaveManagement);

//@desc Delete single Leave
//DELETE api/v1/leaves/:id
//Private
exports.deleteLeaves = factory.deleteOne(LeaveManagement);

//@desc Update Benefit
//PUT api/v1/benefits/:id
//Private
exports.updateLeaves = factory.updateOne(LeaveManagement);
