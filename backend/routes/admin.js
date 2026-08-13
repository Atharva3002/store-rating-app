const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync");
const { validateBody } = require("../middleware/validate");
const { verifyToken, authorizeRoles } = require("../middleware/auth");
const { addUserSchema, addStoreSchema } = require("../schema/validationSchema");
const adminController = require("../controllers/adminController");

router.use(verifyToken, authorizeRoles("admin"));

router.get("/dashboard", wrapAsync(adminController.getDashboard));
router.post("/users", validateBody(addUserSchema), wrapAsync(adminController.addUser));
router.get("/users", wrapAsync(adminController.getUsers));
router.get("/users/:id", wrapAsync(adminController.getUserDetails));
router.post("/stores", validateBody(addStoreSchema), wrapAsync(adminController.addStore));
router.get("/stores", wrapAsync(adminController.getStores));

module.exports = router;
