const bcrypt = require("bcrypt");
const { Op, fn, col, literal } = require("sequelize");
const { User, Store, Rating, sequelize } = require("../models");
const ExpressError = require("../utils/ExpressError");

module.exports.getDashboard = async (req, res) => {
    const totalUsers = await User.count();
    const totalStores = await Store.count();
    const totalRatings = await Rating.count();

    res.status(200).json({
        success: true,
        stats: { totalUsers, totalStores, totalRatings }
    });
};

module.exports.addUser = async (req, res) => {
    const { name, email, address, password, role } = req.body;

    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
        throw new ExpressError(400, "A user with this email already exists");
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const newUser = await User.create({ name, email, address, password: hashedPassword, role });

    res.status(201).json({
        success: true,
        message: "User added successfully",
        user: { id: newUser.id, name: newUser.name, email: newUser.email, role: newUser.role }
    });
};

module.exports.addStore = async (req, res) => {
    const { storeName, storeEmail, storeAddress, ownerName, ownerEmail, ownerAddress, ownerPassword } = req.body;

    const existingStoreEmail = await Store.findOne({ where: { email: storeEmail } });
    if (existingStoreEmail) {
        throw new ExpressError(400, "A store with this email already exists");
    }

    const existingOwnerEmail = await User.findOne({ where: { email: ownerEmail } });
    if (existingOwnerEmail) {
        throw new ExpressError(400, "A user with this owner email already exists");
    }

    const result = await sequelize.transaction(async (t) => {
        const hashedPassword = await bcrypt.hash(ownerPassword, 12);

        const owner = await User.create({
            name: ownerName,
            email: ownerEmail,
            address: ownerAddress,
            password: hashedPassword,
            role: "store_owner"
        }, { transaction: t });

        const store = await Store.create({
            name: storeName,
            email: storeEmail,
            address: storeAddress,
            ownerId: owner.id
        }, { transaction: t });

        return { owner, store };
    });

    res.status(201).json({
        success: true,
        message: "Store added successfully",
        store: result.store
    });
};

module.exports.getStores = async (req, res) => {
    const { name, email, address, sortBy = "name", sortOrder = "ASC" } = req.query;

    const where = {};
    if (name) where.name = { [Op.like]: `%${name}%` };
    if (email) where.email = { [Op.like]: `%${email}%` };
    if (address) where.address = { [Op.like]: `%${address}%` };

    const allowedSort = ["name", "email", "address", "rating"];
    const sortField = allowedSort.includes(sortBy) ? sortBy : "name";
    const order = sortOrder.toUpperCase() === "DESC" ? "DESC" : "ASC";

    const stores = await Store.findAll({
        where,
        attributes: {
            include: [[fn("COALESCE", fn("AVG", col("ratings.rating")), 0), "rating"]]
        },
        include: [{ model: Rating, as: "ratings", attributes: [] }],
        group: ["Store.id"],
        order: sortField === "rating" ? [[literal("rating"), order]] : [[sortField, order]],
        subQuery: false
    });

    res.status(200).json({ success: true, stores });
};

module.exports.getUsers = async (req, res) => {
    const { name, email, address, role, sortBy = "name", sortOrder = "ASC" } = req.query;

    const where = {};
    if (name) where.name = { [Op.like]: `%${name}%` };
    if (email) where.email = { [Op.like]: `%${email}%` };
    if (address) where.address = { [Op.like]: `%${address}%` };
    if (role) where.role = role;

    const allowedSort = ["name", "email", "address", "role"];
    const sortField = allowedSort.includes(sortBy) ? sortBy : "name";
    const order = sortOrder.toUpperCase() === "DESC" ? "DESC" : "ASC";

    const users = await User.findAll({
        where,
        attributes: ["id", "name", "email", "address", "role"],
        order: [[sortField, order]]
    });

    res.status(200).json({ success: true, users });
};

module.exports.getUserDetails = async (req, res) => {
    const { id } = req.params;

    const user = await User.findByPk(id, {
        attributes: ["id", "name", "email", "address", "role"],
        include: [{ model: Store, as: "ownedStore" }]
    });

    if (!user) {
        throw new ExpressError(404, "User not found");
    }

    let rating = null;
    if (user.role === "store_owner" && user.ownedStore) {
        const avg = await Rating.findOne({
            where: { storeId: user.ownedStore.id },
            attributes: [[fn("COALESCE", fn("AVG", col("rating")), 0), "avgRating"]],
            raw: true
        });
        rating = parseFloat(avg.avgRating).toFixed(1);
    }

    res.status(200).json({ success: true, user, rating });
};