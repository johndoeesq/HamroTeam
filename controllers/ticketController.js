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
exports.updateTicket = factory.updateOne(Ticket);

//@desc Update Ticket handled status
//PUT api/v1/tickets/handled/status/:id
//Private
exports.handleTicket = catchAsync(async (req, res, next) => {
	let ticket = await Ticket.findById(req.params.id);
	if (!ticket) {
		return next(new AppError('No Ticket found with that ID', 404));
	}

	if (ticket.handled == false) {
		handled = {
			handled: true,
		};
	}
	ticket = await Ticket.findByIdAndUpdate(req.params.id, handled, {
		new: true,
		runValidators: true,
	});

	res.status(200).json({
		status: 'success',
		data: ticket,
	});
});

//@desc Update Ticket dismiss status
//PUT api/v1/ticket/dismiss/status/:id
//Private
exports.dismissTicket = catchAsync(async (req, res, next) => {
	let ticket = await Ticket.findById(req.params.id);
	if (!ticket) {
		return next(new AppError('No Ticket found with that ID', 404));
	}

	if (ticket.dismissed == false) {
		dismissed = {
			dismissed: true,
		};
	}
	ticket = await Ticket.findByIdAndUpdate(req.params.id, dismissed, {
		new: true,
		runValidators: true,
	});

	res.status(200).json({
		status: 'success',
		data: ticket,
	});
});
