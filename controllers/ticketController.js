const Ticket = require('../models/TicketModel');
const AppError = require('../utils/appError.js');
const catchAsync = require('../utils/catchAsync');
const factory = require('./handlerFactory');

//@desc Create new Ticket
//POST api/v1/ticket
//Private
exports.createTicket = catchAsync(async (req, res, next) => {
	ticket = await Ticket.create(req.body);
	res.status(201).json({ status: 'success', data: ticket });
});

//@desc  get all Ticket
//GET api/v1/ticket
//Public
exports.getAllTicket = catchAsync(async (req, res, next) => {
	res.status(200).json(res.allqueryresults);
});

//@desc get single Ticket
//GET api/v1/ticket/:id
//Public
exports.getTicket = catchAsync(async (req, res, next) => {
	const ticket = await Ticket.findById(req.params.id);

	if (!ticket) {
		return next(new AppError('No Ticket found with that id', 404));
	}
	res.status(200).json({ status: 'success', data: { ticket } });
});

//@desc Delete single Ticket
//DELETE api/v1/ticket/:id
//Private
exports.deleteTicket = factory.deleteOne(Ticket);

//@desc Update Ticket
//PUT api/v1/ticket/:id
//Private
exports.updateTicket = factory.updateOne(Ticket);
