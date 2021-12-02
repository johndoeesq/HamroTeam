/** @format */

const express = require('express');
const app = express();
const morgan = require('morgan');

const connectDB = require('./db');

// const mongoose = require('mongoose');

const mongoose = require('mongoose');

const DB = process.env.DATABASE_URI;

//connect database
connectDB(DB);

//morgan
app.use(morgan('dev'));

// Body parser
app.use(express.json());

module.exports = app;
