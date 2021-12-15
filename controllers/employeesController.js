const Employees = require('../models/EmployeesModel');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');
const factory = require('./handlerFactory');
const multer = require('multer');
const sharp = require('sharp');

//@desc Create new Employee Data
//POST api/v1/employeedata
//Private

const multerStorage = multer.memoryStorage();

const multerFilter = (req, file, cb) => {
	if (file.mimetype.startsWith('image')) {
		cb(null, true);
	} else {
		cb(new AppError('Not an image! Please upload only images.', 400), false);
	}
};

const upload = multer({
	storage: multerStorage,
	fileFilter: multerFilter,
});

exports.uploadEmployeePhoto = upload.single('photo');

exports.resizeEmployeePhoto = catchAsync(async (req, res, next) => {
	if (!req.file) return next();

	req.file.filename = `employee-${Date.now()}.jpeg`;

	await sharp(req.file.buffer)
		.resize(500, 500)
		.toFormat('jpeg')
		.jpeg({ quality: 90 })
		.toFile(`public/employee/${req.file.filename}`);

	req.body.photo = `${req.protocol}://${req.get('host')}/img/employee/${
		req.file.filename
	}`;

	next();
});

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
