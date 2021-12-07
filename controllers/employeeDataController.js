const EmployeeData = require('../models/EmployeeDataModel');
const AppError = require('../utils/appError.js');
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
		.toFile(`public/img/employee/${req.file.filename}`);

	req.body.photo = `${req.protocol}://${req.get('host')}/img/employee/${
		req.file.filename
	}`;

	next();
});

exports.createEmployeeData = catchAsync(async (req, res, next) => {
	employeeData = await EmployeeData.create(req.body);
	res.status(201).json({ status: 'success', data: employeeData });
});

//@desc  get all Employee Data
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
