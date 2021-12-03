const mongoose = require('mongoose');

const LeaveManagementSchema = new mongoose.Schema(
	{
		annual_leave: {
			type: Number,
			require: [true, 'This field is required'],
		},
		sick_leave: {
			type: Number,
			require: [true, 'This field is required'],
		},
		leave_start_date: {
			type: String,
		},
		leave_end_date: {
			type: String,
		},
		HR_approval: {
			type:String,
            enum:["Approved","Unapproved"],
            default: 'Unapproved',
		},
		feedback: {
			type: String,
		},
        employee: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Employees",
            required: [true, "This field is required"],
        },
    },
	{
		timestamps: true,
	},
);

const LeaveManagement = mongoose.model('LeaveManagement', LeaveManagementSchema);
module.exports = LeaveManagement;