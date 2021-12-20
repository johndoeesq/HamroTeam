const mongoose = require('mongoose');

const PayrollSchema = new mongoose.Schema(
	{
		basic_salary: {
			type: Number,
			require: [true, 'An employee must have a salary'],
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
		bank_acc: {
			type: String,
		},
		bank_name: {
			type: String,
		},
		bank_branch: {
			type: String,
		},
		benefits: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'benefits',
		},
	},
	{
		timestamps: true,
	},
);

const Payroll = mongoose.model('Payroll', PayrollSchema);
module.exports = Payroll;
