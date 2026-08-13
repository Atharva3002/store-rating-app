const jwt = require("jsonwebtoken");
const ExpressError = require("../utils/ExpressError");

module.exports.verifyToken = (req, res, next) => {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    if (!token) {
        return next(new ExpressError(401, "You must be logged in to access this"));
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            return next(new ExpressError(401, "Session expired or invalid, please log in again"));
        }
        req.user = decoded;
        next();
    });
};

module.exports.authorizeRoles = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return next(new ExpressError(403, "You do not have permission to perform this action"));
        }
        next();
    };
};
