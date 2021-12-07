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
		authController.restrictToBoth('admin', 'employee'),
		ticketController.getTicket,
	)
	.put(
		authController.protect,
		authController.restrictToBoth('admin', 'employee'),
		ticketController.updateTicket,
	)
	.delete(
		authController.protect,
		authController.restrictToBoth('admin', 'employee'),
		ticketController.deleteTicket,
	);

module.exports = router;
