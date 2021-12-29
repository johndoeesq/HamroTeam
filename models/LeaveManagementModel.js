const mongoose = require('mongoose');

const LeaveManagementSchema = new mongoose.Schema(
	{
		leave_days: {
			type: Number,
			required: [true, 'Number of leave days must be mentioned'],
		},

		leave_description: {
			type: String,
			require: [true, 'A leave must have a description'],
		},

		HR_approval: {
			type: String,
			enum: ['Approved', 'Unapproved'],
			default: 'Unapproved',
		},
		feedback: {
			type: String,
		},
		employee: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Employees',
			required: [true, 'This field is required'],
		},
	}, 
	{
		timestamps: true,
	},
);

const LeaveManagement = mongoose.model(
	'LeaveManagement',
	LeaveManagementSchema,
);
module.exports = LeaveManagement;
