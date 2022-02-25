const Employees = require("../models/EmployeesModel");
const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");
const factory = require("./handlerFactory");
const multer = require("multer");

//@desc Create new Employee Data
//POST api/v1/employeedata
//Private

const multerStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    // setting destination of uploading files
    if (file.mimetype.startsWith("application")) {
      // if uploading pdf/word
      cb(null, "public/files/");
    } else {
      // else uploading image
      cb(null, "public/photos/");
    }
  },
  filename: (req, file, cb) => {
    // naming file
    cb(null, file.fieldname + "-" + file.originalname);
  },
});

const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("application")) {
    // check file type to be pdf, doc, or docx
    cb(null, true);
  }
  // else uploading image
  else if (file.mimetype.startsWith("image")) {
    // check file type to be an image
    cb(null, true);
  } else {
    cb(null, false); // else fails
  }
};

const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
});

exports.uploadFile = upload.fields([
  { name: "resume", maxCount: 1 },
  { name: "citizenship", maxCount: 1 },
  { name: "PAN", maxCount: 1 },
  { name: "photo", maxCount: 1 },
  { name: "offerletter", maxCount: 1 },
  { name: "contract", maxCount: 1 },
]);

exports.resizeDocumentsPhoto = catchAsync(async (req, res, next) => {
  if (!req.files) return next(new AppError("No file selected"));

  let data = [
    "resume",
    "citizenship",
    "PAN",
    "photo",
    "offerletter",
    "contract",
  ];
  let val = [];
  await Promise.all(
    data.map((item) => {
      if (!req.files[item]) {
        return;
      }

      filename = req.files[item][0].filename.replace(" ", "-");

      if (req.files[item][0].mimetype.startsWith("application")) {
        req.body.item = `${req.protocol}://${req.get(
          "host"
        )}/files/${filename}`;
      } else {
        req.body.item = `${req.protocol}://${req.get(
          "host"
        )}/photos/${filename}`;
      }

      val.push([item, req.body.item]);
    })
  );

  result = Object.fromEntries(val);

  next();
});

exports.createEmployees = catchAsync(async (req, res, next) => {
  let data = {
    ...req.body,
    ...result,
  };
  console.log(data);
  const employee = await Employees.create(data);
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
exports.updateemployee = catchAsync(async (req, res, next) => {
  let employee = await Employees.findById(req.params.id);
  if (!employee) {
    return next(new AppError("No document found with that ID", 404));
  }

  let data = {
    ...req.body,
    ...result,
  };

  employee = await Employees.findByIdAndUpdate(req.params.id, data, {
    new: true,
    runValidators: true,
  });
  res.status(200).json({
    status: "success",
    data: employee,
  });
});
