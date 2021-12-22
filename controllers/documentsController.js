const Documents = require('../models/DocumentsModel');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');
const multer = require('multer');
const factory = require('./handlerFactory');
const { object } = require('joi');

//@desc Create new Document
//POST api/v1/documents
//Private

const multerStorage = multer.diskStorage({
	destination: (req, file, cb) => {
		// setting destination of uploading files
		if (file.mimetype.startsWith('application')) {
			// if uploading pdf/word
			cb(null, 'public/files/');
		} else {
			// else uploading image
			cb(null, 'public/photos/');
		}
	},
	filename: (req, file, cb) => {
		// naming file
		cb(null, file.fieldname + '-' + file.originalname);
	},
});

const multerFilter = (req, file, cb) => {
	if (file.mimetype.startsWith('application')) {
		// check file type to be pdf, doc, or docx
		cb(null, true);
	}
	// else uploading image
	else if (file.mimetype.startsWith('image')) {
		// check file type to be an image
		cb(null, true);
	} else {
		cb(null, false); // else fails
	}
};

const upload = multer({
	storage: multerStorage,
	fileFilter: multerFilter,
});

exports.uploadFile = upload.fields([
	{ name: 'resume', maxCount: 1 },
	{ name: 'citizenship', maxCount: 1 },
	{ name: 'PAN', maxCount: 1 },
	{ name: 'photo', maxCount: 1 },
	{ name: 'offerletter', maxCount: 1 },
	{ name: 'contract', maxCount: 1 },
]);

exports.resizeDocumentsPhoto = catchAsync(async (req, res, next) => {
	if (!req.files) return next();

	let data = [
		'resume',
		'citizenship',
		'PAN',
		'photo',
		'offerletter',
		'contract',
	];
	let val = [];
	data.map((item) => {
		if (!req.files[item]) {
			return;
		}
		req.body.item = `${req.protocol}://${req.get(
			'host',
		)}/public/files/${`document_${Date.now()}-${
			req.files[item][0].originalname
		}`}`;

		val.push([item, req.body.item]);
	});

	result = Object.fromEntries(val);

	next();
});

exports.createDocuments = catchAsync(async (req, res, next) => {
	console.log(result)
	const newDocument = await Documents.create(result);
	res.status(201).json({ status: 'success', data: newDocument });
});

//@desc Get all documents
//GET api/v1/documents
//Public
exports.getAllDocuments = catchAsync(async (req, res, next) => {
	res.status(200).json(res.allqueryresults);
});

//@desc Get single document
//GET api/v1/documents/:id
//Private
exports.getDocuments = factory.getOne(Documents);
//@desc Update the document
//PATCH api/v1/docments/:id
//Private
exports.updateDocuments = factory.updateOne(Documents);

//@desc Update the Documents
//PATCH api/v1/documents/:id
//Private
exports.deleteDocuments = factory.deleteOne(Documents);
