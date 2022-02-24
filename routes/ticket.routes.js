const express = require('express');
const ticketController = require('../controllers/ticketController');
const allqueryresults = require('../middleware/allqueryresults');
const Ticket = require('../models/TicketModel');
const authController = require('../controllers/authController');
const {
	checkEmployeeTicketAccess,
} = require('../middleware/checkEmployeeAccess');

const router = express.Router();

router
	.route('/')
	.get(
		allqueryresults(Ticket, {
			path: 'employee',
			select: 'employee_name',
		}),
		authController.protect,
		authController.restrictTo('admin'),
		ticketController.getAllTicket,
	)
	.post(
		authController.protect,
		authController.restrictTo('employee'),
		ticketController.createTicket,
	);

//Admin and the employee who has issued the ticket can view the ticker
router
	.route('/:id')
	.get(
		authController.protect,
		authController.restrictTo('admin', 'employee'),
		checkEmployeeTicketAccess(Ticket),
		ticketController.getTicket,
	)

	.put(
		authController.protect,
		authController.restrictTo('employee'),
		checkEmployeeTicketAccess(Ticket),
		ticketController.updateTicket,
	)
	.delete(
		authController.protect,
		authController.restrictTo('employee'),
		checkEmployeeTicketAccess(Ticket),
		ticketController.deleteTicket,
	);

router
	.route('/handle/status/:id')
	.put(
		authController.protect,
		authController.restrictTo('admin'),
		ticketController.handleTicket,
	);

router
	.route('/dismiss/status/:id')
	.put(
		authController.protect,
		authController.restrictTo('admin'),
		ticketController.dismissTicket,
	);

//Route to display the tickets that belongs to an specific employees
router
	.route('/employee/:employeeID')
	.get(
		authController.protect,
		authController.restrictTo('employee'),
		ticketController.employeeTickets,
	);

module.exports = router;
