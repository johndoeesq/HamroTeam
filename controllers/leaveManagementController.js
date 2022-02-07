const Employees = require('../models/EmployeesModel');
const LeaveManagement = require('../models/LeaveManagementModel');
const AppError = require('../utils/appError.js');
const catchAsync = require('../utils/catchAsync');
const factory = require('./handlerFactory');

//@desc Create new Leave
//POST api/v1/leaves
//Private
exports.createLeaves = catchAsync(async (req, res, next) => {
	let employee = await Employees.findById(req.employee.id);
	if (!employee) {
		return next(new AppError('No Employee found with that id', 404));
	}
	let date = (employee.joining_date.getMonth() + 1) * 30;
	let today = (new Date().getMonth() + 1) * 30;
	let joiningDate = today - date;
	if (joiningDate > 180) {
		if (req.body.leave_days >= 6) {
			remaining_leave_days = {
				remaining_leave_days:
					employee.remaining_leave_days - req.body.leave_days,
			};
			employee = await Employees.findByIdAndUpdate(
				req.employee.id,
				remaining_leave_days,
				{
					new: true,
					runValidators: true,
				},
			);
		}
	}
	//Setting the employee value through the logged in employee
	req.body.employee = req.employee.id;
	const leave = await LeaveManagement.create(req.body);

	res.status(201).json({
		status: 'success',
		results: leave.length,
		data: { leave },
	});
});

//@desc  get all Leaves
//GET api/v1/leaves
//Public
exports.getAllLeaves = catchAsync(async (req, res, next) => {
	res.status(200).json(res.allqueryresults);
});

//@desc get single Leave
//GET api/v1/leaves/:id
//Public
exports.getLeaves = factory.getOne(LeaveManagement);

//@desc Delete single Leave
//DELETE api/v1/leaves/:id
//Private
exports.deleteLeaves = factory.deleteOne(LeaveManagement);

//@desc Update Leaves
//PUT api/v1/leaves/:id
//Private
exports.updateLeaves = factory.updateOne(LeaveManagement);

// @desc      Update leave status
// @route     UPDATE /api/v1/leave/status/:id
// @access    Private
exports.approveStatus = catchAsync(async (req, res, next) => {
	let leave = await LeaveManagement.findById(req.params.id);

	if (!leave) {
		return next(
			new ErrorResponse(
				`No LeaveManagement with the id of ${req.params.id}`,
				404,
			),
		);
	}

	if (leave.HR_approval == 'Unapproved') {
		HR_approval = {
			HR_approval: 'Approved',
		};

		leave = await LeaveManagement.findByIdAndUpdate(
			req.params.id,
			HR_approval,
			{
				new: true,
				runValidators: true,
			},
		);
	}

	res.status(200).json({
		success: true,
		message: 'Successfully updated',
	});
});

exports.leaveFeedback = factory.updateOne(LeaveManagement);
