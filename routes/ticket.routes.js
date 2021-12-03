const express = require('express');
const ticketController = require('../controllers/ticketController');
const allqueryresults = require('../middleware/allqueryresults');
const Ticket = require('../models/TicketModel');

const router = express.Router();

router
	.route('/')
	.get(allqueryresults(Ticket), ticketController.getAllTicket)
	.post(ticketController.createTicket);

router
	.route('/:id')
	.get(ticketController.getTicket)
	.put(ticketController.updateTicket)
	.delete(ticketController.deleteTicket);

module.exports = router;
