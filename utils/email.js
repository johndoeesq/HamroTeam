const nodemailer = require('nodemailer');

const sendEmail = async (options) => {
	console.log(options);

	// 1) Create a transporter
	const transporter = nodemailer.createTransport({
		host: process.env.EMAIL_HOST,
		port: process.env.EMAIL_PORT,
		auth: {
			user: process.env.SENDGRID_USERNAME,
			pass: process.env.SENDGRID_PASSWORD,
		},
	});
	console.log(transporter);

	// 2) Define the email options
	const mailOptions = {
		from: 'Hash Technologies <noreply@hashtechnologies.com>',
		to: options.email,
		subject: options.subject,
		text: options.message,
		// html:
	};

	// 3) Actually send the email
	await transporter.sendMail(mailOptions);
};

module.exports = sendEmail;
