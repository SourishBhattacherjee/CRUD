const taskService = require("../services/taskService");

exports.createTask = async (req, res) => {
  const task = await taskService.createTask(req.user.id, req.body);
  res.json(task);
};

exports.getTasks = async (req, res) => {
  const tasks = await taskService.getTasks(req.user.id);
  res.json(tasks);
};

exports.updateTask = async (req, res) => {
  const task = await taskService.updateTask(
    req.params.id,
    req.user.id,
    req.body
  );
  res.json(task);
};

exports.deleteTask = async (req, res) => {
  await taskService.deleteTask(req.params.id, req.user.id);
  res.json({ message: "Task deleted" });
};