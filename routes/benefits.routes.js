const express = require('express');
const benefitsController = require('../controllers/benefitsController');
const allqueryresults = require('../middleware/allqueryresults');
const Benefits = require('../models/BenefitsModel');
const authController = require('../controllers/authController');

const router = express.Router();

router
	.route('/')
	.get(
		allqueryresults(Benefits),
		authController.protect,
		authController.restrictToBoth('admin', 'employee'),
		benefitsController.getAllBenefits,
	)
	.post(
		authController.protect,
		authController.restrictTo('admin'),
		benefitsController.createBenefits,
	);

router
	.route('/:id')
	.get(
		authController.protect,
		
		benefitsController.getBenefits,
	)
	.put(
		authController.protect,
		authController.restrictTo('admin'),
		benefitsController.updateBenefits,
	)
	.delete(
		authController.protect,
		authController.restrictTo('admin'),
		benefitsController.deleteBenefits,
	);

module.exports = router;
