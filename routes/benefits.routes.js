const express = require('express');
const benefitsController = require('../controllers/benefitsController');
const allqueryresults = require('../middleware/allqueryresults');
const Benefits = require('../models/BenefitsModel');
const authController = require('../controllers/authController');

const router = express.Router();

router
	.route('/')
	.get(
		authController.protect,
		authController.restrictTo('admin'),
		allqueryresults(Benefits),
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
		authController.restrictTo('admin'),
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
