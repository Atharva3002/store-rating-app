const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync");
const { validateBody } = require("../middleware/validate");
const { verifyToken } = require("../middleware/auth");
const { signupSchema, loginSchema, updatePasswordSchema } = require("../schema/validationSchema");
const authController = require("../controllers/authController");

router.post("/signup", validateBody(signupSchema), wrapAsync(authController.signup));
router.post("/login", validateBody(loginSchema), wrapAsync(authController.login));
router.put("/update-password", verifyToken, validateBody(updatePasswordSchema), wrapAsync(authController.updatePassword));
router.get("/me", verifyToken, wrapAsync(authController.getMe));

module.exports = router;
