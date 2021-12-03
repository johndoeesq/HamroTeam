const Payroll = require('../models/PayrollModel');
const AppError = require('../utils/appError.js');
const catchAsync = require('../utils/catchAsync');
const factory = require('./handlerFactory');

//@desc Create new Payroll
//POST api/v1/payroll
//Private
exports.createPayroll = catchAsync(async (req, res, next) => {
	payroll = await Payroll.create(req.body);
	res.status(201).json({ status: 'success', data: payroll });
});

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
	const payroll = await Payroll.findById(req.params.id);

	if (!payroll) {
		return next(new AppError('No Payroll found with that id', 404));
	}
	res.status(200).json({ status: 'success', data: { payroll } });
});

//@desc Delete single Payroll
//DELETE api/v1/payroll/:id
//Private
exports.deletePayroll = factory.deleteOne(Payroll);

//@desc Update Payroll
//PUT api/v1/payroll/:id
//Private
exports.updatePayroll = factory.updateOne(Payroll);
