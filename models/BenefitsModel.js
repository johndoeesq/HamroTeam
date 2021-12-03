const mongoose = require('mongoose');

const BenefitSchema = new mongoose.Schema(
	{
		accomodation: {
			type: String,
		},
		transport: {
			type: String,
		},
		gadgets: {
			type: [String],
		},
		house_rent: {
			type: Number,
		},
		insurance: {
			type: Boolean,
			default: false,
		},

		transport_fare: {
			type: Number,
		},
		lunch_fare: {
			type: Number,
		},
		miscellaneous_fare: {
			type: Number,
		},
	},
	{
		timestamps: true,
	},
);

const Benefits = mongoose.model('Benefits', BenefitSchema);
module.exports = Benefits;
