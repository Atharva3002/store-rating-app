const { fn, col } = require("sequelize");
const { Store, Rating, User } = require("../models");
const ExpressError = require("../utils/ExpressError");

module.exports.getDashboard = async (req, res) => {
    const ownerId = req.user.id;

    const store = await Store.findOne({ where: { ownerId } });
    if (!store) {
        throw new ExpressError(404, "No store is linked to this account");
    }

    const ratings = await Rating.findAll({
        where: { storeId: store.id },
        include: [{ model: User, as: "rater", attributes: ["id", "name", "email", "address"] }],
        order: [["createdAt", "DESC"]]
    });

    const avgResult = await Rating.findOne({
        where: { storeId: store.id },
        attributes: [[fn("COALESCE", fn("AVG", col("rating")), 0), "avgRating"]],
        raw: true
    });

    res.status(200).json({
        success: true,
        store: { id: store.id, name: store.name, email: store.email, address: store.address },
        averageRating: parseFloat(avgResult.avgRating).toFixed(1),
        raters: ratings.map((r) => ({
            id: r.rater.id,
            name: r.rater.name,
            email: r.rater.email,
            address: r.rater.address,
            rating: r.rating
        }))
    });
};
