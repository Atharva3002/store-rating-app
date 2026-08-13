const bcrypt = require("bcrypt");
const { User } = require("../models");
const ExpressError = require("../utils/ExpressError");
const generateToken = require("../utils/generateToken");

module.exports.signup = async (req, res) => {
    const { name, email, address, password } = req.body;

    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
        throw new ExpressError(400, "An account with this email already exists");
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const newUser = await User.create({
        name,
        email,
        address,
        password: hashedPassword,
        role: "user"
    });

    const token = generateToken(newUser);

    res.status(201).json({
        success: true,
        message: "Account created successfully",
        token,
        user: { id: newUser.id, name: newUser.name, email: newUser.email, role: newUser.role }
    });
};

module.exports.login = async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ where: { email } });
    if (!user) {
        throw new ExpressError(401, "Invalid email or password");
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        throw new ExpressError(401, "Invalid email or password");
    }

    const token = generateToken(user);

    res.status(200).json({
        success: true,
        message: "Logged in successfully",
        token,
        user: { id: user.id, name: user.name, email: user.email, role: user.role }
    });
};

module.exports.updatePassword = async (req, res) => {
    const { oldPassword, newPassword } = req.body;

    const user = await User.findByPk(req.user.id);
    if (!user) {
        throw new ExpressError(404, "User not found");
    }

    const isMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isMatch) {
        throw new ExpressError(400, "Old password is incorrect");
    }

    user.password = await bcrypt.hash(newPassword, 12);
    await user.save();

    res.status(200).json({ success: true, message: "Password updated successfully" });
};

module.exports.getMe = async (req, res) => {
    const user = await User.findByPk(req.user.id, { attributes: ["id", "name", "email", "address", "role"] });
    res.status(200).json({ success: true, user });
};
