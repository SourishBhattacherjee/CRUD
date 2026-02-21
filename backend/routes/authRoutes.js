const router = require("express").Router();
const { body } = require("express-validator");
const authController = require("../controllers/authController");

router.post(
	"/register",
	[
		body("name").trim().notEmpty().withMessage("Name is required"),
		body("email").isEmail().withMessage("Valid email is required"),
		body("password").isLength({ min: 6 }).withMessage("Password must be at least 6 characters"),
		body("role").optional().isIn(["USER", "ADMIN"]).withMessage("Invalid role"),
	],
	authController.register
);

router.post(
	"/login",
	[
		body("email").isEmail().withMessage("Valid email is required"),
		body("password").notEmpty().withMessage("Password is required"),
	],
	authController.login
);

module.exports = router;