const dotenv = require('dotenv');
dotenv.config();
const app = require('./app');

process.on('uncaughtException', (err) => {
    console.log('UNCAUGHT EXCEPTION ! Shutting Down....');
    console.log(err);
    process.exit(1);
});

const port = process.env.PORT || 5000;

const server = app.listen(port, () => {
    console.log(`Server running at PORT : ${port}`);
});