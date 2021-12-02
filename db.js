const mongoose = require('mongoose');
require('dotenv').config();

const connectDB = async (DB) => {
	try {
		await Promise.all([closeDB(), OpenDB(DB)]);
	} catch (err) {
		console.log(err);
	}
};

const closeDB = async () => {
	if (mongoose.connection.readyState === 1) {
		await mongoose.connection.close(function () {
			console.log('Mongoose disconnected on app switch');
		});
	}
};

const OpenDB = async (DB) => {
	mongoose
		.connect(DB, {
			keepAlive: true,

			useNewUrlParser: true,

			useUnifiedTopology: true,
		})
		.then(() => {
			console.log(`DB connected...`);
		})
		.catch((err) => {
			console.log(err);
		});
	console.log(`MongoDB connected....`);
};

module.exports = connectDB;
