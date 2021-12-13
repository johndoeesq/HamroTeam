const mongoose = require('mongoose');

const DocumentsSchema = new mongoose.Schema(
	{
		CV: {
			type: String,
			required: [true, 'This field is required'],
		},
		citizenship: {
			type: String,
			required: [true, 'This field is required'],
		},
		passport: {
			type: String,
		},
		PAN: {
			type: String,
		},
		photo: {
			type: String,
			required: [true, 'This field is required'],
		},
		bank_acc: {
			type: String,
		},
		offer_letter: {
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
