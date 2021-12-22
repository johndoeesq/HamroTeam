const Employees = require('../models/EmployeesModel');
const LeaveManagement = require('../models/LeaveManagementModel');
const AppError = require('../utils/appError.js');
const catchAsync = require('../utils/catchAsync');
const factory = require('./handlerFactory');

//@desc Create new Leave
//POST api/v1/leaves
//Private
exports.createLeaves = catchAsync(async (req, res, next) => {
	const leaveData= await LeaveManagement.findOne({employee:req.employee.id})
	console.log(leaveData)

	
	const leave = await LeaveManagement.create(req.body);
    
	res.status(201).json({
		status: 'success',
		results: leave.length,
		data: { leave },
	});
});

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
