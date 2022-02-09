const crypto = require('crypto');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const EmployeesSchema = new mongoose.Schema(
	{
		employee_number: {
			type: String,
			unique: true,
			required: [true, 'An employee must have a number'],
		},
		email: {
			type: String,
			unique: true,
			required: [true, 'An employee must have a email'],
		},
		password: {
			type: String,
			required: [true, 'An employee must have a password'],
		},
		department: {
			type: String,
			required: [true, 'An employee must have a department'],
		},
		designation: {
			type: String,
			required: [true, 'An employee must have a designation'],
		},
		available_days: {
			type: Number,
			required: [true, 'Available days must be mentioned'],
		},
		available_hours: {
			type: Number,
			required: [true, 'Available hours must be mentioned'],
		},
		joining_date: {
			type: Date,
			required: [true, 'Joining date must be mentioned'],
		},
		promotion_date: {
			type: Date,
		},
		designation_before_promotion: {
			type: String,
		},
		designation_after_promotion: {
			type: String,
		},

		role: {
			type: String,
			enum: ['admin', 'employee'],
			required: [true, 'Role must be assigned'],
		},
		type: {
			type: String,
			enum: ['freelancing', 'intern', 'fulltime'],
			required: [true, 'An employee must have a type'],
		},

		remaining_leave_days: {
			type: Number,
			default: 30,
		},
		employee_name: {
			type: String,
			require: [true, 'An employee must have a name'],
		},
		DOB: {
			type: String,
			required: [true, 'An employee must have a date of birth'],
		},
		address: {
			type: String,
			required: [true, 'An employee must have an address'],
		},
		phone: {
			type: Number,
			required: [true, 'An employee must have a phone number'],
			unique: true,
		},

		blood_group: {
			type: String,
			enum: ['A+', 'B+', 'O+', 'AB+', 'A-', 'O-', 'B-', 'AB-'],
		},
		gender: {
			type: String,
			required: [true, 'An employee must have a gender'],
		},
		passport: {
			type: Number,
		},
		annual_leave: {
			type: Number,
		},
		sick_leave: {
			type: Number,
		},
		basic_salary: {
			type: Number,
			required: [true, 'An employee must have a salary'],
		},
		provident_fund: {
			type: Number,
		},
		tax: {
			type: Number,
		},
		allowance: {
			type: Number,
		},
		gross_salary: {
			type: Number,
		},
		bank: {
			name: {
				type: String,
			},
			account: {
				type: String,
			},
			branch: {
				type: String,
			},
		},
		accomodation: {
			type: String,
		},
		transport: {
			type: String,
		},
		gadgets: {
			type: [String],
		},
		house_rent: {
			type: Number,
		},
		insurance: {
			type: Boolean,
			default: false,
		},
		transport_fare: {
			type: Number,
		},
		lunch_fare: {
			type: Number,
		},
		miscellaneous_fare: {
			type: Number,
		},
		contact_name: {
			type: String,
			required: [true, 'Emergency contact must have a name'],
		},
		contact_number: {
			type: Number,
			required: [true, 'Emergency contact must have a contact number'],
		},
		contact_relation: {
			type: String,
			required: [true, 'Relation to emergency contact must be mentioned'],
		},
		contact_address: {
			type: String,
			required: [true, 'Emergency contact address must be given'],
		},

		resume: {
			type: String,
			//required: [true, 'Resume of an employee is required'],
		},
		citizenship: {
			type: String,
			//required: [true, 'Citizenship of an employee is required'],
		},

		PAN: {
			type: String,
		},
		photo: {
			type: String,
			//	required: [true, 'Photo of an employee is required'],
		},

		offerletter: {
			type: String,
		},
		contract: {
			type: String,
		},

		passwordChangedAt: Date,
		passwordResetToken: String,
		passwordResetExpires: Date,
	},
	{ timestamps: true },
);

EmployeesSchema.pre('save', async function (next) {
	//Only run this function if password was actually modified
	if (!this.isModified('password')) return next();

	//Hash the password with cost of 12
	const salt = await bcrypt.genSalt(12);
	this.password = await bcrypt.hash(this.password, salt);

	// Delete passwordConfirm field
	this.passwordConfirm = undefined;
	next();
});

EmployeesSchema.pre('save', function (next) {
	if (!this.isModified('password') || this.isNew) return next();
	this.passwordChangedAt = Date.now() - 1000;
	next();
});

EmployeesSchema.pre(/^find/, function (next) {
	//this points to the current query
	this.find({ active: { $ne: false } });
	next();
});

EmployeesSchema.methods.correctPassword = async function (
	candidatePassword,
	userPassword,
) {
	return await bcrypt.compare(candidatePassword, userPassword);
};
EmployeesSchema.methods.changedPasswordAfter = function (JWTTimestamp) {
	if (this.passwordChangedAt) {
		const changedTimestamp = parseInt(
			this.passwordChangedAt.getTime() / 1000,
			10,
		);

		return JWTTimestamp < changedTimestamp;
	}

	// False means NOT changed
	return false;
};

EmployeesSchema.methods.createPasswordResetToken = function () {
	const resetToken = crypto.randomBytes(32).toString('hex');

	this.passwordResetToken = crypto
		.createHash('sha256')
		.update(resetToken)
		.digest('hex');

	// console.log({ resetToken }, this.passwordResetToken);

	this.passwordResetExpires = Date.now() + 10 * 60 * 1000;

	return resetToken;
};

EmployeesSchema.methods.setUserVerified = function () {
	this.isVerified = true;
};

const Employees = mongoose.model('Employees', EmployeesSchema);

module.exports = Employees;
