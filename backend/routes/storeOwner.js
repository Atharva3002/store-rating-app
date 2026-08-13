const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync");
const { verifyToken, authorizeRoles } = require("../middleware/auth");
const storeOwnerController = require("../controllers/storeOwnerController");

router.use(verifyToken, authorizeRoles("store_owner"));

router.get("/dashboard", wrapAsync(storeOwnerController.getDashboard));

module.exports = router;
