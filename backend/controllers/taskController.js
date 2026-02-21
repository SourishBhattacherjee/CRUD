const taskService = require("../services/taskService");
const { validationResult } = require("express-validator");

exports.createTask = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      message: "Validation failed",
      errors: errors.array().map((e) => ({ field: e.param, message: e.msg })),
    });
  }
  try {
    const task = await taskService.createTask(req.user.id, req.body);
    res.json(task);
  } catch (err) {
    if (err && err.errors) return res.status(400).json(err);
    res.status(400).json({ message: err.message });
  }
};

exports.getTasks = async (req, res) => {
  const tasks = await taskService.getTasks(
    req.user.id,
    req.user.role
  );
  res.json(tasks);
};

exports.updateTask = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      message: "Validation failed",
      errors: errors.array().map((e) => ({ field: e.param, message: e.msg })),
    });
  }
  try {
    const task = await taskService.updateTask(
      req.params.id,
      req.user.id,
      req.user.role,
      req.body
    );
    res.json(task);
  } catch (err) {
    if (err && err.errors) return res.status(400).json(err);
    res.status(400).json({ message: err.message });
  }
};

exports.deleteTask = async (req, res) => {
  try {
    await taskService.deleteTask(
      req.params.id,
      req.user.id,
      req.user.role
    );
    res.json({ message: "Task deleted" });
  } catch (err) {
    if (err && err.errors) return res.status(400).json(err);
    res.status(400).json({ message: err.message });
  }
};