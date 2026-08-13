if (process.env.NODE_ENV !== "production") {
    require("dotenv").config();
}

const bcrypt = require("bcrypt");
const { sequelize, User } = require("../models");

const seedAdmin = async () => {
    try {
        await sequelize.sync({ alter: true });

        const existingAdmin = await User.findOne({ where: { role: "admin" } });
        if (existingAdmin) {
            console.log("An admin account already exists:", existingAdmin.email);
            process.exit(0);
        }

        const hashedPassword = await bcrypt.hash("Admin@1234", 12);

        const admin = await User.create({
            name: "System Administrator Account",
            email: "admin@storerating.com",
            address: "Head Office, Pune, Maharashtra",
            password: hashedPassword,
            role: "admin"
        });

        console.log("Default admin created:");
        console.log("  Email:    admin@storerating.com");
        console.log("  Password: Admin@1234");
        process.exit(0);
    } catch (err) {
        console.error("Seeding failed:", err);
        process.exit(1);
    }
};

seedAdmin();
