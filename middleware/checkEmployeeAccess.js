const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

exports.checkEmployeeAccess = (Model) =>
	catchAsync(async (req, res, next) => {
		const data = await Model.findById(req.params.id);
		if (!data) {
			return next(new AppError('No data found with that id', 404));
		} else {
			if (
				data.id === req.employee.id ||
				data.id === req.employee.employee_data.toString() ||
				data.id === req.employee.payroll.toString() ||
				data.id === req.employee.emergency_contact.toString() ||
				data.id === req.employee.documents.toString() ||
				req.employee.role == 'admin'
			) {
				return next();
			} else {
				return next(
					new AppError(
						'Sorry!You are forbiddden to view this content',
						403,
					),
				);
			}
		}
	});

exports.checkEmployeeLeaveAccess = (Model) =>
	catchAsync(async (req, res, next) => {
		const data = await Model.findById(req.params.id);

		if (!data) {
			return next(new AppError('No data found with that id', 404));
		} else {
			if (
				data.employee.toString() === req.employee.id ||
				req.employee.role == 'admin'
			) {
				return next();
			} else {
				return next(
					new AppError(
						'Sorry!You are forbiddden to view this content',
						403,
					),
				);
			}
		}
	});
