const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');

//Delete one document
exports.deleteOne = (Model) =>
	catchAsync(async (req, res, next) => {
		const doc = await Model.findByIdAndDelete(req.params.id);

		if (!doc) {
			return next(new AppError('No document found with that ID', 404));
		}
		res.status(200).json({
			status: 'success',
			message: 'Successfully Deleted',
			data: {},
		});
	});

//Update single document
exports.updateOne = (Model) =>
	catchAsync(async (req, res, next) => {
		//To check if the req.body is empty
		if (Object.keys(req.body).length === 0) {
			return next(new AppError(`Nothing to update`, 200));
		}
		const doc = await Model.findByIdAndUpdate(req.params.id, req.body, {
			new: true,
			runValidators: true,
		});

		if (!doc) {
			return next(new AppError('No document found with that ID', 404));
		}

		res.status(200).json({
			status: 'success',
			data: doc,
		});
	});

//Create single document
exports.createOne = (Model) =>
	catchAsync(async (req, res, next) => {
		const doc = await Model.create(req.body);

		res.status(201).json({
			status: 'success',
			results: doc.length,
			data: { doc },
		});
	});

//Get Single Document
exports.getOne = (Model, popOptions) =>
	catchAsync(async (req, res, next) => {
		let query = Model.findById(req.params.id);
		if (popOptions) query = query.populate(popOptions);
		const doc = await query;

		if (!doc) {
			return next(new AppError('No document found with that ID', 404));
		}

		res.status(200).json({
			status: 'success',
			data: doc,
		});
	});
