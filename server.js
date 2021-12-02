require('dotenv').config('./env');
const PORT = process.env.PORT;
const app = require('./app');
app.listen(PORT, (err) => {
	if (err) return console.log(err);
	console.log(`Server Running in ${process.env.NODE_ENV} mode  at ${PORT}...`);
});
