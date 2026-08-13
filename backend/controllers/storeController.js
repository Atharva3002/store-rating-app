const { Op, fn, col, literal } = require("sequelize");
const { Store, Rating, sequelize } = require("../models");
const ExpressError = require("../utils/ExpressError");

// Normal user: browse stores, see overall rating + their own submitted rating
module.exports.getStoresForUser = async (req, res) => {
    const { name, address } = req.query;
    const userId = req.user.id;

    const where = {};
    if (name) where.name = { [Op.like]: `%${name}%` };
    if (address) where.address = { [Op.like]: `%${address}%` };

    const stores = await Store.findAll({
        where,
        attributes: {
            include: [[fn("COALESCE", fn("AVG", col("ratings.rating")), 0), "overallRating"]]
        },
        include: [{ model: Rating, as: "ratings", attributes: [] }],
        group: ["Store.id"],
        order: [["name", "ASC"]],
        subQuery: false
    });

    // attach the logged-in user's own rating for each store
    const userRatings = await Rating.findAll({ where: { userId }, raw: true });
    const ratingMap = {};
    userRatings.forEach((r) => { ratingMap[r.storeId] = r.rating; });

    const storesWithUserRating = stores.map((store) => {
        const plain = store.toJSON();
        plain.overallRating = parseFloat(plain.overallRating).toFixed(1);
        plain.userRating = ratingMap[store.id] || null;
        return plain;
    });

    res.status(200).json({ success: true, stores: storesWithUserRating });
};

module.exports.submitRating = async (req, res) => {
    const { id: storeId } = req.params;
    const { rating } = req.body;
    const userId = req.user.id;

    const store = await Store.findByPk(storeId);
    if (!store) {
        throw new ExpressError(404, "Store not found");
    }

    const [ratingRecord, created] = await Rating.findOrCreate({
        where: { userId, storeId },
        defaults: { rating }
    });

    if (!created) {
        ratingRecord.rating = rating;
        await ratingRecord.save();
    }

    res.status(200).json({
        success: true,
        message: created ? "Rating submitted successfully" : "Rating updated successfully",
        rating: ratingRecord
    });
};