const Benefits = require('../models/BenefitsModel');
const AppError = require('../utils/appError.js');
const catchAsync = require('../utils/catchAsync');
const factory = require('./handlerFactory');

//@desc Create new Benefit
//POST api/v1/benefits
//Private
exports.createBenefits = catchAsync(async (req, res, next) => {
	benefits = await Benefits.create(req.body);
	res.status(201).json({ status: 'success', data: benefits });
});

//@desc  get all Benefit
//GET api/v1/benefits
//Public
exports.getAllBenefits = catchAsync(async (req, res, next) => {
	res.status(200).json(res.allqueryresults);
});

//@desc get single Benefit
//GET api/v1/benefits/:id
//Public
exports.getBenefits = catchAsync(async (req, res, next) => {
	const benefits = await Benefits.findById(req.params.id);

	if (!benefits) {
		return next(new AppError('No Benefits found with that id', 404));
	}
	res.status(200).json({ status: 'success', data: { benefits } });
});

//@desc Delete single Benefit
//DELETE api/v1/benefits/:id
//Private
exports.deleteBenefits = factory.deleteOne(Benefits);

//@desc Update Benefit
//PUT api/v1/benefits/:id
//Private
exports.updateBenefits = factory.updateOne(Benefits);
