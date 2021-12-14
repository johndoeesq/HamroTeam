const crypto = require('crypto');
const { promisify } = require('util');
const jwt = require('jsonwebtoken');
const Employee = require('./../models/EmployeesModel');
const Token = require('../models/tokenModel.js');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');
const Joi = require('joi');
const bcrypt = require('bcryptjs');
const sendEmail = require('../utils/email');

const signToken = (id, role) => {
	return jwt.sign({ id, role }, process.env.JWT_SECRET, {
		expiresIn: process.env.JWT_EXPIRES_IN,
	});
};

const createSendToken = (employee, statusCode, req, res) => {
	const token = signToken(employee._id, employee.role);

	// employee.password = undefined;
	Token.create();

	res.status(statusCode).json({
		status: 'success',
		token,
		// data: employee,AS
	});
};

exports.login = catchAsync(async (req, res, next) => {
	const schema = Joi.object({
		password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
		email: Joi.string().email({
			minDomainSegments: 2,
			tlds: { allow: ['com', 'net'] },
		}),
	});

	const { error } = schema.validate({
		email: req.body.email,
		password: req.body.password,
	});

	if (error) {
		return next(new AppError(`${error.details[0].message}`, 403));
	}

	const { email, password } = req.body;

	// 1) Check if email and password exist
	if (!email || !password) {
		return next(new AppError('Please provide email and password!', 400));
	}
	// 2) Check if employee exists && password is correct
	const employee = await Employee.findOne({ email }).select('+password');

	if (!employee || !bcrypt.compareSync(password, employee.password)) {
		return next(new AppError('Invalid email or password', 401));
	}

	if (employee.role === 'admin') {
		return next(new AppError('Not for admin login', 401));
	}

	createSendToken(employee, 200, req, res);
});

exports.loginAdmin = catchAsync(async (req, res, next) => {
	const { email, password } = req.body;

	// 1) Check if email and password exist
	if (!email || !password) {
		return next(new AppError('Please provide email and password!', 400));
	}
	// 2) Check if employee exists && password is correct
	const employee = await Employee.findOne({ email }).select('+password');

	if (!employee || !bcrypt.compareSync(password, employee.password)) {
		return next(new AppError('Invalid email or password', 401));
	}

	if (employee.role === 'employee') {
		return next(new AppError('Not for employee login', 401));
	}

	// 3) If everything ok, send token to client
	createSendToken(employee, 200, req, res);
});

exports.protect = catchAsync(async (req, res, next) => {
	// 1) Getting token and check of it's there
	let token;
	if (
		req.headers.authorization &&
		req.headers.authorization.startsWith('Bearer')
	) {
		token = req.headers.authorization.split(' ')[1];
	}

	if (!token) {
		return next(
			new AppError(
				'You are not logged in! Please log in to get access.',
				401,
			),
		);
	}

	// 2) Verification token

	const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

	// 3) Check if employee still exists
	const currentemployee = await Employee.findById(decoded.id);
	if (!currentemployee) {
		return next(
			new AppError(
				'The employee belonging to this token does no longer exist.',
				401,
			),
		);
	}

	// 4) Check if employee changed password after the token was issued
	if (currentemployee.changedPasswordAfter(decoded.iat)) {
		return next(
			new AppError(
				'Employee recently changed password! Please log in again.',
				401,
			),
		);
	}

	// GRANT ACCESS TO PROTECTED ROUTE

	req.employee = currentemployee;

	// res.locals.employee = currentemployee;
	next();
});

//Route protection  to only admin
exports.restrictTo = (...roles) => {
	return (req, res, next) => {
		// roles ['admin', 'lead-guide']. role='employee'
		if (!roles.includes(req.employee.role)) {
			return next(
				new AppError(
					`You do not have permission to perform this action.`,
					403,
				),
			);
		}
		next();
	};
};

// Node js express  authentication and authorization middleware

//Route protection to both admin and employee
exports.restrictToBoth = (...roles) => {
	return (req, res, next) => {
		// roles ['admin', 'lead-guide']. role='employee'
		if (!roles.includes(req.employee.role)) {
			return next(
				new AppError(
					`You do not have permission to perform this action.`,
					403,
				),
			);
		}
		next();
	};
};

exports.forgotPassword = catchAsync(async (req, res, next) => {
	// 1) Get employee based on POSTed email
	const employee = await Employee.findOne({ email: req.body.email });
	if (!employee) {
		return next(
			new AppError('There is no employee with email address.', 404),
		);
	}

	// 2) Generate the random reset token
	const resetToken = employee.createPasswordResetToken();

	await employee.save({ validateBeforeSave: false });

	// 3) Send it to employee's email
	try {
		const resetURL = `${req.protocol}://${req.get(
			'host',
		)}/api/v1/employees/resetPassword/${resetToken}`;

		const message = `Forgot Your Password? Submit a PUT Request with your new password and PasswordConfirm to : ${resetURL} \n If you did not forget your password , please ignore this message.`;

		await sendEmail({
			email: employee.email,
			subject: 'Your password reset token valid for 10 minutes.',
			message,
		});

		res.status(200).json({
			status: 'success',
			message: 'Token sent to email!',
		});
	} catch (err) {
		employee.passwordResetToken = undefined;
		employee.passwordResetExpires = undefined;
		await employee.save({ validateBeforeSave: false });

		return next(
			new AppError('There was an error sending the email. Try again later!'),
			500,
		);
	}
});

exports.resetPassword = catchAsync(async (req, res, next) => {
	// 1) Get employee based on the token
	const hashedToken = crypto
		.createHash('sha256')
		.update(req.params.token)
		.digest('hex');

	console.log(hashedToken);

	const employee = await Employee.findOne({
		passwordResetToken: hashedToken,
		passwordResetExpires: { $gt: Date.now() },
	});

	// 2) If token has not expired, and there is employee, set the new password
	if (!employee) {
		return next(new AppError('Token is invalid or has expired', 400));
	}
	employee.password = req.body.password;
	employee.passwordConfirm = req.body.passwordConfirm;
	employee.passwordResetToken = undefined;
	employee.passwordResetExpires = undefined;
	if (employee.password == employee.passwordConfirm) {
		await employee.save();
	} else {
		return next(new AppError('Password didnt match', 400));
	}

	// 3) Update changedPasswordAt property for the employee
	// 4) Log the employee in, send JWT
	createSendToken(employee, 200, req, res);
});

exports.updatePassword = catchAsync(async (req, res, next) => {
	// 1) Get employee from collection
	const employee = await Employee.findById(req.employee.id).select(
		'+password',
	);

	// 2) Check if POSTed current password is correct
	if (
		!(await employee.correctPassword(
			req.body.passwordCurrent,
			employee.password,
		))
	) {
		return next(new AppError('Your current password is wrong.', 401));
	}

	// 3) If so, update password
	employee.password = req.body.password;
	employee.passwordConfirm = req.body.passwordConfirm;
	await employee.save();
	// employee.findByIdAndUpdate will NOT work as intended!

	// 4) Log employee in, send JWT
	createSendToken(employee, 200, req, res);
});
