const Payroll = require('../models/PayrollModel');
const AppError = require('../utils/appError.js');
const catchAsync = require('../utils/catchAsync');
const factory = require('./handlerFactory');

//@desc Create new Payroll
//POST api/v1/payroll
//Private
exports.createPayroll = factory.createOne(Payroll);
//@desc  get all Payroll
//GET api/v1/payroll
//Public
exports.getAllPayroll = catchAsync(async (req, res, next) => {
	res.status(200).json(res.allqueryresults);
});

//@desc get single Payroll
//GET api/v1/payroll/:id
//Public
exports.getPayroll = catchAsync(async (req, res, next) => {
	const benefits = await Projects.findById(req.body.benefits);

	if (!benefits) {
		return next(new AppError('No Benefits found with that id', 404));
	}
	factory.getOne(Payroll);
});

//@desc Delete single Payroll
//DELETE api/v1/payroll/:id
//Private
exports.deletePayroll = factory.deleteOne(Payroll);

//@desc Update Payroll
//PUT api/v1/payroll/:id
//Private
exports.updatePayroll = factory.updateOne(Payroll);
