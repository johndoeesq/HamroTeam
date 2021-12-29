const mongoose = require('mongoose');

const PayrollSchema = new mongoose.Schema(
	{
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
		bank:{
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
