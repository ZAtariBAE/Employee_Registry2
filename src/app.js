
const express = require('express');
const employeeRoutes = require('./routes/employeeRoutes');
//const errorHandler = require('./middlewares/errorHandler');

const app = express();

app.use(express.json());
app.use('/v1/employees', employeeRoutes);
//app.use(errorHandler);

module.exports = app;
