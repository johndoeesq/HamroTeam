const Projects = require('../models/ProjectsModel');
const AppError = require('../utils/appError.js');
const catchAsync = require('../utils/catchAsync');
const factory = require('./handlerFactory');

//@desc Create new Project
//POST api/v1/projects
//Private
exports.createProjects = factory.createOne(Projects);
//@desc  get all Projects
//GET api/v1/projects
//Public
exports.getAllProjects = catchAsync(async (req, res, next) => {
	res.status(200).json(res.allqueryresults);
});

//@desc get single Project
//GET api/v1/projects/:id
//Public
exports.getProjects = factory.getOne(Projects);

//@desc Delete single Project
//DELETE api/v1/projects/:id
//Private
exports.deleteProjects = factory.deleteOne(Projects);

//@desc Update Project
//PUT api/v1/projects/:id
//Private
exports.updateProjects = factory.updateOne(Projects);

//@desc Update Project Status
//PUT api/v1/projects/status/:id
//Private
exports.updateProjectStatus = catchAsync(async (req, res, next) => {
	let projects = await Projects.findById(req.params.id);

	if (!projects) {
		return next(new AppError('No project found with that ID', 404));
	}

	if (projects.project_status == 'Ongoing') {
		project_status = {
			project_status: 'Past',
		};
		projects = await Projects.findByIdAndUpdate(
			req.params.id,
			project_status,
			{
				new: true,
				runValidators: true,
			},
		);
	}

	res.status(200).json({
		status: 'success',
		data: projects,
		message: 'Successfully updated the status',
	});
});
