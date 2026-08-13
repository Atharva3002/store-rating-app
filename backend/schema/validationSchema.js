const Joi = require("joi");

// Name: Min 20, Max 60 | Address: Max 400
// Password: 8-16 chars, at least one uppercase letter and one special character
// Email: standard email validation

const passwordPattern = /^(?=.*[A-Z])(?=.*[!@#$%^&*(),.?":{}|<>]).{8,16}$/;

module.exports.signupSchema = Joi.object({
    name: Joi.string().min(20).max(60).required(),
    email: Joi.string().email().required(),
    address: Joi.string().max(400).required(),
    password: Joi.string().pattern(passwordPattern).required().messages({
        "string.pattern.base": "Password must be 8-16 characters and include at least one uppercase letter and one special character"
    })
});

module.exports.loginSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required()
});

module.exports.updatePasswordSchema = Joi.object({
    oldPassword: Joi.string().required(),
    newPassword: Joi.string().pattern(passwordPattern).required().messages({
        "string.pattern.base": "Password must be 8-16 characters and include at least one uppercase letter and one special character"
    })
});

module.exports.addUserSchema = Joi.object({
    name: Joi.string().min(20).max(60).required(),
    email: Joi.string().email().required(),
    address: Joi.string().max(400).required(),
    password: Joi.string().pattern(passwordPattern).required().messages({
        "string.pattern.base": "Password must be 8-16 characters and include at least one uppercase letter and one special character"
    }),
    role: Joi.string().valid("admin", "user").required()
});

module.exports.addStoreSchema = Joi.object({
    storeName: Joi.string().min(20).max(60).required(),
    storeEmail: Joi.string().email().required(),
    storeAddress: Joi.string().max(400).required(),
    ownerName: Joi.string().min(20).max(60).required(),
    ownerEmail: Joi.string().email().required(),
    ownerAddress: Joi.string().max(400).required(),
    ownerPassword: Joi.string().pattern(passwordPattern).required().messages({
        "string.pattern.base": "Password must be 8-16 characters and include at least one uppercase letter and one special character"
    })
});

module.exports.ratingSchema = Joi.object({
    rating: Joi.number().integer().min(1).max(5).required()
});
