
const express = require('express');
const employeeRoutes = require('./routes/employeeRoutes');

const app = express();
app.use(express.json());


app.use ((err, req, res, next) => {
    if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
        return res.status(400).json({
            message: "Bad Request.",
            errors: ['Malformed JSON payload.']
        })
    }
    next(err)
});

app.use('/v1/employees', employeeRoutes);
module.exports = app;
