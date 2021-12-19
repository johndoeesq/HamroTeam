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
		company_pf: {
			type: Number,
		},
		net_salary: {
			type: Number,
		},
		bank_acc: {
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
