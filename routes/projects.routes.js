const express = require('express');
const projectsController = require('../controllers/projectsController');
const allqueryresults = require('../middleware/allqueryresults');
const Projects = require('../models/ProjectsModel');

const router = express.Router();

router
	.route('/')
	.get(allqueryresults(Projects), projectsController.getAllProjects)
	.post(projectsController.createProjects);

router
	.route('/:id')
	.get(projectsController.getProjects)
	.put(projectsController.updateProjects)
	.delete(projectsController.deleteProjects);

module.exports = router;
