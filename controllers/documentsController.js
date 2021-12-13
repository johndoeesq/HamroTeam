const Documents = require('../models/DocumentsModel');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');
const multer = require('multer');
const factory = require('./handlerFactory');

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
		// check file type to be png, jpeg, or jpg
		cb(null, true);
	} else {
		cb(null, false); // else fails
	}
};

const upload = multer({
	storage: multerStorage,
	fileFilter: multerFilter,
});

(exports.uploadFile = upload.fields([
	{ name: 'CV', maxCount: 1 },
	{ name: 'citizenship', maxCount: 1 },
	{ name: 'PAN', maxCount: 1 },
	{ name: 'photo', maxCount: 1 },
	{ name: 'offerletter', maxCount: 1 },
	{ name: 'contract', maxCount: 1 },
])),
	(exports.resizeDocumentsPhoto = catchAsync(async (req, res, next) => {
		if (!req.files) return next();

		// console.log(req.files, "ma data check gardai xu")

		req.files.map((file) => {
			if (file.mimetype.startsWith('application')) {
				req.body.files.push(
					`${req.protocol}://${req.get(
						'host',
					)}/public/files/${`document_${Date.now()}-${
						file.originalname
					}`}`,
				);
			} else {
				req.body.images.push(
					`${req.protocol}://${req.get(
						'host',
					)}/public/photos/${`documentImages_${Date.now()}-${
						file.originalname
					}`}`,
				);
			}
		});

		next();
	}));

exports.createDocuments = catchAsync(async (req, res, next) => {
	const newDocument = await Documents.create(req.body);
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
exports.getDocuments = catchAsync(async (req, res, next) => {
	const document = await Documents.findById(req.params.id);

	if (!document) {
		return next(new AppError('No document found with that id', 404));
	}
	res.status(200).json({ status: 'success', data: document });
});

//@desc Update the document
//PATCH api/v1/docments/:id
//Private
exports.updateDocuments = factory.updateOne(Documents);

//@desc Update the Documents
//PATCH api/v1/documents/:id
//Private
exports.deleteDocuments = factory.deleteOne(Documents);
