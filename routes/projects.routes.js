const express = require('express');
const projectsController = require('../controllers/projectsController');
const allqueryresults = require('../middleware/allqueryresults');
const Projects = require('../models/ProjectsModel');
const authController = require('../controllers/authController');
const {
	checkEmployeeProjectAccess,
} = require('../middleware/checkEmployeeAccess');

const router = express.Router();

router
	.route('/')
	.get(
		allqueryresults(Projects, [
			{
				path: 'manager',
				select: 'employee_name',
			},
			{
				path: 'team.employees_assigned',
				select: 'employee_name',
			},
		]),
		authController.protect,
		authController.restrictTo('admin'),
		projectsController.getAllProjects,
	)
	.post(
		authController.protect,
		authController.restrictTo('admin'),
		projectsController.createProjects,
	);

router
	.route('/:id')
	.get(
		authController.protect,
		authController.restrictTo('admin', 'employee'),
		checkEmployeeProjectAccess(Projects),
		projectsController.getProjects,
	)
	.put(
		authController.protect,
		authController.restrictTo('admin'),
		projectsController.updateProjects,
	)
	.delete(
		authController.protect,
		authController.restrictTo('admin'),
		projectsController.deleteProjects,
	);

router
	.route('/Ongoingstatus/:id')
	.put(
		authController.protect,
		authController.restrictTo('admin'),
		projectsController.updateProjectStatus,
	);

router
	.route('/Upcomingstatus/:id')
	.put(
		authController.protect,
		authController.restrictTo('admin'),
		projectsController.updateProjectAnotherStatus,
	);

//Specific projects for an employee
router
	.route('/employee/:employeeID')
	.get(
		authController.protect,
		authController.restrictTo('employee'),
		projectsController.getSpecificProjects,
	);

module.exports = router;
