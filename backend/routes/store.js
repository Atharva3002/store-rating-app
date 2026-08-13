const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync");
const { validateBody } = require("../middleware/validate");
const { verifyToken, authorizeRoles } = require("../middleware/auth");
const { ratingSchema } = require("../schema/validationSchema");
const storeController = require("../controllers/storeController");

router.use(verifyToken, authorizeRoles("user"));

router.get("/", wrapAsync(storeController.getStoresForUser));
router.post("/:id/rating", validateBody(ratingSchema), wrapAsync(storeController.submitRating));

module.exports = router;
