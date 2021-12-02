const mongoose = require('mongoose');

const EmergencyContactSchema = new mongoose.Schema(
	{
		contact_name: {
			type: String,
			require: [true, 'Name of the contact must have a salary'],
		},
		contact: {
			type: Number,
			require: [true, 'Contact number must be given'],
		},
		relation: {
			type: String,
			require: [true, 'Relation must be defined'],
		},
		address: {
			type: String,
			required: [true, 'Address must be given'],
		},

		email: {
			type: String,
		},
	},
	{
		timestamps: true,
	},
);

const EmergencyContact = mongoose.model(
	'EmergencyContact',
	EmergencyContactSchema,
);
module.exports = EmergencyContact;
