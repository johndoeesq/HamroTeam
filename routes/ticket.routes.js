const express = require('express');
const ticketController = require('../controllers/ticketController');
const allqueryresults = require('../middleware/allqueryresults');
const Ticket = require('../models/TicketModel');
const authController = require('../controllers/authController');

const router = express.Router();

router
	.route('/')
	.get(
		allqueryresults(Ticket),
		authController.protect,
		authController.restrictTo('admin'),
		ticketController.getAllTicket,
	)
	.post(
		authController.protect,
		authController.restrictTo('employee'),
		ticketController.createTicket,
	);

router
	.route('/:id')
	.get(
		authController.protect,
	
		ticketController.getTicket,
	)
	.put(
		authController.protect,
		authController.restrictTo('admin', 'employee'),
		ticketController.updateTicket,
	)
	.delete(
		authController.protect,
		authController.restrictTo('admin', 'employee'),
		ticketController.deleteTicket,
	);

module.exports = router;