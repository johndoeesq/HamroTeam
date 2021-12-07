const mongoose = require('mongoose');

const ProjectsSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			require: [true, 'This field is required'],
		},
		status: {
			type: String,
			enum: ['Past', 'Ongoing', 'Upcoming'],
			default: 'Ongoing',
			require: [true, 'This field is required'],
		},
		deadline: {
			type: String,
			require: [true, 'This field is required'],
		},
		progress: {
			type: String,
			require: [true, 'This field is required'],
		},
		manager: {
			type: String,
			require: [true, 'This field is required'],
		},
		feedback: {
			type: String,
		},
		employees_assigned: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Employees',
			required: [true, 'This field is required'],
		},
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
