const Ticket = require('../models/TicketModel');
const AppError = require('../utils/appError.js');
const catchAsync = require('../utils/catchAsync');
const factory = require('./handlerFactory');

//@desc Create new Ticket
//POST api/v1/ticket
//Private
exports.createTicket = factory.createOne(Ticket);

//@desc  get all Ticket
//GET api/v1/ticket
//Public
exports.getAllTicket = catchAsync(async (req, res, next) => {
	res.status(200).json(res.allqueryresults);
});

//@desc get single Ticket
//GET api/v1/ticket/:id
//Public
exports.getTicket = factory.getOne(Ticket);

//@desc Delete single Ticket
//DELETE api/v1/ticket/:id
//Private
exports.deleteTicket = factory.deleteOne(Ticket);

//@desc Update Ticket
//PUT api/v1/ticket/:id
//Private
exports.updateTicket = catchAsync(async (req, res, next) => {
	
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

//@desc Update Ticket
//PUT api/v1/ticket/dismissed/:id
//Private
exports.createOne =
catchAsync(async (req, res, next) => {
	const ticket = await Ticket.findById(req.params);

	res.status(201).json({
		status: 'success',
		results: doc.length,
		data: { doc },
	});
});
