const router = require("express").Router();
const { body } = require("express-validator");
const taskController = require("../controllers/taskController");
const { protect } = require("../middlewares/authMiddleware");

router.use(protect);

router.post(
	"/",
	[body("title").trim().notEmpty().withMessage("Title is required")],
	taskController.createTask
);

router.get("/", taskController.getTasks);

router.put(
	"/:id",
	[
		body("title").optional().trim().notEmpty().withMessage("Title cannot be empty"),
		body("completed").optional().isBoolean().withMessage("Completed must be boolean"),
	],
	taskController.updateTask
);

router.delete("/:id", taskController.deleteTask);

module.exports = router;