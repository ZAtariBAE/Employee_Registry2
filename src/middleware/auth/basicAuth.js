
const basicAuth = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).json({
            message: "Authentication required."
        });
    }

    const expectedAuth = `${process.env.BASIC_TOKEN}`;

    if (authHeader !== expectedAuth) {
        return res.status(401).json({
            message: "Invalid Credentials"
        });
    }

    next();
}

module.exports = basicAuth;