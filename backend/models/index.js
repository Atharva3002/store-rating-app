const sequelize = require("../config/db");
const User = require("./User");
const Store = require("./Store");
const Rating = require("./Rating");

// A user (store_owner) owns one store
User.hasOne(Store, { foreignKey: "ownerId", as: "ownedStore" });
Store.belongsTo(User, { foreignKey: "ownerId", as: "owner" });

// A store has many ratings, a rating belongs to one store
Store.hasMany(Rating, { foreignKey: "storeId", as: "ratings" });
Rating.belongsTo(Store, { foreignKey: "storeId", as: "store" });

// A user can submit many ratings, a rating belongs to one user
User.hasMany(Rating, { foreignKey: "userId", as: "ratings" });
Rating.belongsTo(User, { foreignKey: "userId", as: "rater" });

module.exports = { sequelize, User, Store, Rating };
