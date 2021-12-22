const mongoose = require('mongoose');
const EmployeeDataSchema = new mongoose.Schema(
	{
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
		email: {
			type: String,
			required: [true, 'An employee must have an email address'],
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

	},
	{
		timestamps: true,
	},
);

const EmployeeData = mongoose.model('EmployeeData', EmployeeDataSchema);
module.exports = EmployeeData;
