const ExpressError = require("../utils/ExpressError");

module.exports.validateBody = (schema) => {
    return (req, res, next) => {
        const { error } = schema.validate(req.body);
        if (error) {
            const errMsg = error.details.map((el) => el.message).join(", ");
            return next(new ExpressError(400, errMsg));
        }
        next();
    };
};
