
const jwt = require("jsonwebtoken");

function isLoggedin(req, res, next) {
    const token = req.cookies.token;

    if (!token) {
        return res.status(401).json({
            message: "Please login first"
        });
    }

    try {
        const data = jwt.verify(
            token,
            process.env.JWT_SECRET
        );

        req.user = data;
        next();

    } catch (error) {
        return res.status(401).json({
            message: "Invalid or expired token"
        });
    }
}

module.exports = isLoggedin;
