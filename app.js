/** @format */

const express = require('express');
const app = express();
const morgan = require('morgan');
const path = require('path');
const bodyParser = require('body-parser');
const globalErrorHandler = require('./controllers/errorController');
const cors = require('cors');

const connectDB = require('./db');

app.use(express.urlencoded({ extended: false }));
app.use(express.json({ limit: '10kb' }));
app.use(express.static(path.join(__dirname, 'public')));
if (process.env.NODE_ENV == 'development') {
	app.use(morgan('dev'));
}

const DB = process.env.DATABASE_URI;

//connect database
connectDB(DB);

//morgan
app.use(morgan('dev'));

// Body parser
app.use(express.json());
app.use(cors());

app.use(
	bodyParser.urlencoded({
		extended: true,
	}),
);

// const EmployeeDataRouter = require("./routes/employeeData.routes");
const EmployeesRouter = require('./routes/employees.routes');
const PayrollRouter = require('./routes/payroll.routes');
const BenefitsRouter = require('./routes/benefits.routes');
const EmergencyContactRouter = require('./routes/emergencyContact.routes');
const LeaveManagementRouter = require('./routes/leaveManagement.routes');
const ProjectsRouter = require('./routes/projects.routes');
const DocumentsRouter = require('./routes/documents.routes');
const TicketRouter = require('./routes/ticket.routes');
const AuthRouter = require('./routes/auth.routes');
const AppError = require('./utils/appError');

app.use('/api/v1/employees', EmployeesRouter);
// app.use("/api/v1/employeedata", EmployeeDataRouter);
app.use('/api/v1/payroll', PayrollRouter);
app.use('/api/v1/benefits', BenefitsRouter);
app.use('/api/v1/emergencycontact', EmergencyContactRouter);
app.use('/api/v1/leaves', LeaveManagementRouter);
app.use('/api/v1/projects', ProjectsRouter);
app.use('/api/v1/documents', DocumentsRouter);
app.use('/api/v1/tickets', TicketRouter);
app.use('/api/v1/auth', AuthRouter);

app.all('*', (req, res, next) => {
	return next(new AppError(`Cant find ${req.originalUrl} on this server.`));
});

app.use(globalErrorHandler);

module.exports = app;
