if (process.env.NODE_ENV !== "production") {
    require("dotenv").config();
}

const express = require("express");
const app = express();
const cors = require("cors");
const { sequelize } = require("./models");
const ExpressError = require("./utils/ExpressError");
const errorHandler = require("./middleware/errorHandler");

const authRouter = require("./routes/auth");
const adminRouter = require("./routes/admin");
const storeRouter = require("./routes/store");
const storeOwnerRouter = require("./routes/storeOwner");

app.use(cors());
app.use(express.json());

sequelize.authenticate()
    .then(() => console.log("Connected to MYSQL"))
    .catch((err) => console.log("DB connection error:", err));

app.get("/api/health", (req, res) => {
    res.status(200).json({ success: true, message: "Server is up and running" });
});

app.use("/api/auth", authRouter);
app.use("/api/admin", adminRouter);
app.use("/api/stores", storeRouter);
app.use("/api/store-owner", storeOwnerRouter);

app.all("*", (req, res, next) => {
    next(new ExpressError(404, "Route not found"));
});

app.use(errorHandler);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});
