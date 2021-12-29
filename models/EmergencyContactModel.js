const mongoose = require('mongoose');

const EmergencyContactSchema = new mongoose.Schema({
		contact_name: {
			type: String,
			required: [true, 'Emergency contact must have a name'],
		},
		contact: {
			type: Number,
			required: [true, 'Emergency contact must have a contact number'],
		},
		relation: {
			type: String,
			required: [true, 'Relation to emergency contact must be mentioned'],
		},
		address: {
			type: String,
			required: [true, 'Emergency contact address must be given'],
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
