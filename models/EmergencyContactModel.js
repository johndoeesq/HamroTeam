const mongoose = require('mongoose');

const EmergencyContactSchema = new mongoose.Schema({
	
	emergencycontact: [{
		
		contact_name: {
			type: String,
			required: [true, 'Name of the contact must have a salary'],
		},
		contact: {
			type: Number,
			required: [true, 'Contact number must be given'],
		},
		relation: {
			type: String,
			required: [true, 'Relation must be defined'],
		},
		address: {
			type: String,
			required: [true, 'Address must be given'],
		},

		email: {
			type: String,
		},
	}],
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
