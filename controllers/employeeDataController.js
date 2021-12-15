const EmployeeData = require('../models/EmployeeDataModel');
const AppError = require('../utils/appError.js');
const catchAsync = require('../utils/catchAsync');
const factory = require('./handlerFactory');

//@desc Create New Employee Data
//GET api/v1/employees
//Private
exports.createEmployeeData = factory.createOne(EmployeeData);

//@desc  Get all Employee Data
//GET api/v1/employeedata
//Public
exports.getAllEmployeeData = catchAsync(async (req, res, next) => {
	res.status(200).json(res.allqueryresults);
});

//@desc get single Employee Data
//GET api/v1/employeedata/:id
//Public
exports.getEmployeeData = catchAsync(async (req, res, next) => {
	const employeeData = await EmployeeData.findById(req.params.id);

	if (!employeeData) {
		return next(new AppError('No employeeData found with that id', 404));
	}
	res.status(200).json({ status: 'success', data: { employeeData } });
});

//@desc Delete single Employee Data
//DELETE api/v1/employeedata/:id
//Private
exports.deleteemployeeData = factory.deleteOne(EmployeeData);

//@desc Update Employee Data
//PUT api/v1/employeedata/:id
//Private
exports.updateemployeeData = factory.updateOne(EmployeeData);
