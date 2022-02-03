const Employees = require("../models/EmployeesModel");
const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");
const factory = require("./handlerFactory");
const multer = require("multer");
const sharp = require("sharp");
const Documents = require("../models/DocumentsModel");
// const EmployeeData = require('../models/EmployeeDataModel');
const Payroll = require("../models/PayrollModel");
const EmergencyContact = require("../models/EmergencyContactModel");

//@desc Create new Employee Data
//POST api/v1/employeedata
//Private

const multerStorage = multer.memoryStorage();

const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb(new AppError("Not an image! Please upload only images.", 400), false);
  }
};

const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
});

exports.uploadEmployeePhoto = upload.single("photo");

exports.resizeEmployeePhoto = catchAsync(async (req, res, next) => {
  if (!req.file) return next();

  req.file.filename = `employee-${Date.now()}.jpeg`;

  await sharp(req.file.buffer)
    .resize(500, 500)
    .toFormat("jpeg")
    .jpeg({ quality: 90 })
    .toFile(`public/employee/${req.file.filename}`);

  req.body.photo = `${req.protocol}://${req.get("host")}/employee/${
    req.file.filename
  }`;

  next();
});

exports.createEmployees = catchAsync(async (req, res, next) => {
  // const employeeData = await EmployeeData.findById(req.body.employee_data);
  // if (!employeeData) {
  // 	return next(new AppError('No employeeData found with that id', 404));
  // }
  const documents = await Documents.findById(req.body.documents);
  if (!documents) {
    return next(new AppError("No documents found with that id", 404));
  }
  const payroll = await Payroll.findById(req.body.payroll);
  if (!payroll) {
    return next(new AppError("No payroll found with that id", 404));
  }

  const emergencyContact = await EmergencyContact.findById(
    req.body.emergency_contact
  );
  if (!emergencyContact) {
    return next(new AppError("No emergencyContact found with that id", 404));
  }

  const employee = await Employees.create(req.body);
  res.status(200).json({
    status: "success",
    data: employee,
  });
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
exports.getEmployee = factory.getOne(Employees);

//@desc Delete single Employee
//DELETE api/v1/employeedata/:id
//Private
exports.deleteemployee = factory.deleteOne(Employees);

//@desc Update Single Employee
//PUT api/v1/employeedata/:id
//Private
exports.updateemployee = factory.updateOne(Employees);
