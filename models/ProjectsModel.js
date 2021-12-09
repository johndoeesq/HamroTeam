const mongoose = require('mongoose');

const ProjectsSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			require: [true, 'name field is required'],
		},
		status: {
			type: String,
			enum: ['Past', 'Ongoing', 'Upcoming'],
			default: 'Ongoing',
			require: [true, 'status field is required'],
		},
		deadline: {
			type: String,
			require: [true, 'deadline field is required'],
		},
		progress: {
			type: String,
			require: [true, 'progress field is required'],
		},
		manager: {
			type: String,
			require: [true, 'manager field is required'],
		},
		feedback: {
			type: String,
		},
		team:[{
		employees_assigned: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Employees',
			required: [true, 'employees_assigned field is required'],
		},
		assigned_as: {
            type:String,
			require: [true,'assigned_as field is required']
		},
		}],
		role: {
			type: String,
			enum: ['project_manager', 'project_leader'],
		},
	},
	{
		timestamps: true,
	},
);

const Projects = mongoose.model('Projects', ProjectsSchema);
module.exports = Projects;
