const router = require("express").Router();
const taskController = require("../controllers/taskController");
const { protect } = require("../middlewares/authMiddleware");

router.use(protect);

router.post("/", taskController.createTask);
router.get("/", taskController.getTasks);
router.put("/:id", taskController.updateTask);
router.delete("/:id", taskController.deleteTask);

module.exports = router;