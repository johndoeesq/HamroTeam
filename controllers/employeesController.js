const Employees = require('../models/EmployeesModel');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');
const factory = require('./handlerFactory');

//@desc Create New Employee
//GET api/v1/employees
//Private
exports.createEmployees = catchAsync(async (req, res, next) => {
	newEmployee = await Employees.create(req.body);
	res.status(201).json({ status: 'success', data: { newEmployee } });
});

//@desc Get All Employees
//GET api/v1/employees
//Public
exports.getAllEmployees = catchAsync(async (req, res, next) => {
	res.status(200).json(res.allqueryresults);
});

//@desc Get Single Employee
//GET api/v1/employees
//Public
exports.getEmployee = catchAsync(async (req, res, next) => {
	const employee = await Employees.findById(req.params.id);

	if (!employee) {
		return next(new AppError('No employee found with that id', 404));
	}
	res.status(200).json({ status: 'success', data: { employee } });
});

//@desc Delete single Employee
//DELETE api/v1/employeedata/:id
//Private
exports.deleteemployee = factory.deleteOne(Employees);

//@desc Update Single Employee
//PUT api/v1/employeedata/:id
//Private
exports.updateemployee = factory.updateOne(Employees);
