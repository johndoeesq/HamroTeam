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
