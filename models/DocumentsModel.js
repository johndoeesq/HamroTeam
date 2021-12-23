const mongoose = require('mongoose');

const DocumentsSchema = new mongoose.Schema(
	{
		resume: {
			type: String,
			required: [true, 'Resume of an employee is required'],
		},
		citizenship: {
			type: String,
			required: [true, 'Citizenship of an employee is required'],
		},

		PAN: {
			type: String,
		},
		photo: {
			type: String,
			required: [true, 'Photo of an employee is required'],
		},

		offerletter: {
			type: String,
		},
		contract: {
			type: String,
		},
	},
	{ timestamps: true },
);

const Document = mongoose.model('Document', DocumentsSchema);

module.exports = Document;
