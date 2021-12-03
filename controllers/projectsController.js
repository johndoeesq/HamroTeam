const Projects = require('../models/ProjectsModel');
const AppError = require('../utils/appError.js');
const catchAsync = require('../utils/catchAsync');
const factory = require('./handlerFactory');

//@desc Create new Project
//POST api/v1/projects
//Private
exports.createProjects = catchAsync(async (req, res, next) => {
	projects = await Projects.create(req.body);
	res.status(201).json({ status: 'success', data: projects });
});

//@desc  get all Projects
//GET api/v1/projects
//Public
exports.getAllProjects = catchAsync(async (req, res, next) => {
	res.status(200).json(res.allqueryresults);
});

//@desc get single Project
//GET api/v1/projects/:id
//Public
exports.getProjects = catchAsync(async (req, res, next) => {
	const projects = await Projects.findById(req.params.id);

	if (!projects) {
		return next(new AppError('No Benefits found with that id', 404));
	}
	res.status(200).json({ status: 'success', data: { projects } });
});

//@desc Delete single Project
//DELETE api/v1/projects/:id
//Private
exports.deleteProjects = factory.deleteOne(Projects);

//@desc Update Project
//PUT api/v1/projects/:id
//Private
exports.updateProjects = factory.updateOne(Projects);
