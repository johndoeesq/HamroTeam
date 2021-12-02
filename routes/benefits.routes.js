const express = require('express');
const benefitsController = require('../controllers/benefitsController');
const allqueryresults = require('../middleware/allqueryresults');
const Benefits = require('../models/BenefitsModel');

const router = express.Router();

router
	.route('/')
	.get(allqueryresults(Benefits), benefitsController.getAllBenefits)
	.post(benefitsController.createBenefits);

router
	.route('/:id')
	.get(benefitsController.getBenefits)
	.put(benefitsController.updateBenefits)
	.delete(benefitsController.deleteBenefits);

module.exports = router;
