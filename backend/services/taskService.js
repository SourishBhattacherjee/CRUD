const Task = require("../models/Task");

exports.createTask = (userId, data) =>
  {
    const errors = [];
    if (!data?.title || !String(data.title).trim()) errors.push({ field: "title", message: "Title is required" });
    if (errors.length) return Promise.reject({ message: "Validation failed", errors });
    return Task.create({ title: data.title, user: userId });
  }

exports.getTasks = (userId, userRole) => {
  if (userRole === "ADMIN") {
    return Task.find().populate("user", "email name");
  }
  return Task.find({ user: userId });
};

exports.updateTask = (taskId, userId, userRole, data) => {
  const errors = [];
  if (data.title !== undefined && !String(data.title).trim()) errors.push({ field: "title", message: "Title cannot be empty" });
  if (data.completed !== undefined && typeof data.completed !== "boolean") errors.push({ field: "completed", message: "Completed must be boolean" });
  if (errors.length) return Promise.reject({ message: "Validation failed", errors });

  if (userRole === "ADMIN") {
    return Task.findByIdAndUpdate(taskId, data, { new: true });
  }

  return Task.findOneAndUpdate(
    { _id: taskId, user: userId },
    data,
    { new: true }
  );
};

exports.deleteTask = (taskId, userId, userRole) => {
  if (userRole === "ADMIN") {
    return Task.findByIdAndDelete(taskId);
  }

  return Task.findOneAndDelete({ _id: taskId, user: userId });
};