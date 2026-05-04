
const apiKeyAuth = (req, res, next) => {
    const authHeader = req.headers['api-key'];

    if (!authHeader) {
        return res.status(401).json({
            message: "Authentication required."
        });
    }

    const expectedAuth = `${process.env.API_KEY_VALUE}`;

    if (authHeader !== expectedAuth) {
        return res.status(401).json({
            message: "Invalid Credentials"
        });
    }

    next();
}

module.exports = apiKeyAuth;