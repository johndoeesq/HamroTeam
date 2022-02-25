const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");

exports.checkEmployeeAccess = (Model) =>
  catchAsync(async (req, res, next) => {
    const data = await Model.findById(req.params.id);
    if (!data) {
      return next(new AppError("No data found with that id", 404));
    } else {
      if (data.id === req.employee.id || req.employee.role == "admin" || "HR") {
        return next();
      } else {
        return next(
          new AppError("Sorry!You are forbiddden to view this content", 403)
        );
      }
    }
  });

//Checking the accessing employee is the one who made the leave request
exports.checkEmployeeLeaveAccess = (Model) =>
  catchAsync(async (req, res, next) => {
    const data = await Model.findById(req.params.id);

    if (!data) {
      return next(new AppError("No data found with that id", 404));
    } else {
      if (
        data.employee.toString() === req.employee.id ||
        req.employee.role == "admin"
      ) {
        return next();
      } else {
        return next(
          new AppError("Sorry!You are forbiddden to view this content", 403)
        );
      }
    }
  });

//Checking the employee  is actually assigned to the project
exports.checkEmployeeProjectAccess = (Model) =>
  catchAsync(async (req, res, next) => {
    const data = await Model.findById(req.params.id);

    if (!data) {
      return next(new AppError("No data found with that id", 404));
    } else {
      let value = false;
      data.team.map((item) => {
        if (
          req.employee.id == item.employees_assigned.toString() ||
          req.employee.role == "admin"
        ) {
          value = true;
        }
      });

      if (value === true) {
        return next();
      } else {
        return next(
          new AppError("Sorry!You are not assigned to this project!")
        );
      }
    }
  });

//To check the employee is the one who has generated the tickets
exports.checkEmployeeTicketAccess = (Model) =>
  catchAsync(async (req, res, next) => {
    const data = await Model.findById(req.params.id);

    if (!data) {
      return next(new AppError("No data found with that id", 404));
    } else {
      if (
        data.employee._id.toString() === req.employee.id ||
        req.employee.role == "admin"
      ) {
        return next();
      } else if (
        data.employee._id.toString() === req.employee.id ||
        req.employee.role == "admin"
      ) {
        return next();
      } else {
        return next(
          new AppError("Sorry!You are forbiddden to view this content", 403)
        );
      }
    }
  });
