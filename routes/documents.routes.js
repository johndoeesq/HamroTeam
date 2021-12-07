const express = require("express");
const documentsController = require("../controllers/documentsController");
//const authController = require("../controllers/authController");
const allqueryresults = require('../middleware/allqueryresults');
const Documents= require('../models/DocumentsModel');
const authController=require('../controllers/authController')

const router = express.Router();

router
	.route('/')
	.get(
		allqueryresults(Documents),
		authController.protect,
        authController.restrictTo("admin"),
		documentsController.getAllDocuments,
	)
    .post(
        authController.protect,
        authController.restrictTo("admin"),

		// read images
		documentsController.uploadFile,
		// image controller
		documentsController.resizeDocumentsPhoto,

        documentsController.createDocuments
      );
    

router
	.route('/:id')
	.get(authController.protect,
        
		documentsController.getDocuments)
	.put(authController.protect,
        authController.restrictTo("admin"),
		documentsController.uploadFile,
		// image controller
		documentsController.resizeDocumentsPhoto,
		documentsController.updateDocuments)
	.delete(authController.protect,
        authController.restrictTo("admin"),
		documentsController.deleteDocuments);

module.exports = router;
