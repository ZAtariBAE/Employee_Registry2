
const express = require('express');
const employeeRoutes = require('./routes/employeeRoutes');
const basicAuth = require('./middleware/auth/basicAuth');
const apiKeyAuth = require('./middleware/auth/apiKeyAuth');


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

const authMethods = {
    'basic': basicAuth,
    'apiKey': apiKeyAuth,
    'none': (req, res, next) => next()
}

const requestedAuthMethod = process.env.AUTH_METHOD || 'none';
const authMiddleware = authMethods[requestedAuthMethod];
if (!authMiddleware) {
    console.warn(`Invalid AUTH_METHOD "${requestedAuthMethod}" specified. Defaulting to no authentication.`);
    authMiddleware = authMethods['none'];
}
app.use('/v1/employees', authMiddleware, employeeRoutes);
module.exports = app;
