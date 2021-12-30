const mongoose = require('mongoose');

const ProjectsSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			require: [true, 'name field is required'],
		},
		project_status: {
			type: String,
			enum: ['Past', 'Ongoing', 'Upcoming'],
			default: 'Ongoing',
			required: [true, 'status field is required'],
		},
		deadline: {
			type: String,
			required: [true, 'deadline field is required'],
		},
		progress: {
			type: String,
			required: [true, 'progress field is required'],
		},
		manager: {
			type: String,
			required: [true, 'manager field is required'],
		},
		feedback: {
			type: String,
		},
		team: [
			{
				employees_assigned: {
					type: mongoose.Schema.Types.ObjectId,
					ref: 'Employees',
					required: [true, 'employees_assigned field is required'],
				},
				assigned_as: {
					type: String,
					required: [true, 'assigned_as field is required'],
				},
			},
		],
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
