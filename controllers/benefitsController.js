const Benefits = require('../models/BenefitsModel');
const AppError = require('../utils/appError.js');
const catchAsync = require('../utils/catchAsync');
const factory = require('./handlerFactory');

//@desc Create new Benefit
//POST api/v1/benefits
//Private
exports.createBenefits = factory.createOne(Benefits);
//@desc  get all Benefit
//GET api/v1/benefits
//Public
exports.getAllBenefits = catchAsync(async (req, res, next) => {
	res.status(200).json(res.allqueryresults);
});

//@desc get single Benefit
//GET api/v1/benefits/:id
//Public
exports.getBenefits = factory.getOne(Benefits);

//@desc Delete single Benefit
//DELETE api/v1/benefits/:id
//Private
exports.deleteBenefits = factory.deleteOne(Benefits);

//@desc Update Benefit
//PUT api/v1/benefits/:id
//Private
exports.updateBenefits = factory.updateOne(Benefits);
