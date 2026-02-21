const Task = require("../models/Task");

exports.createTask = (userId, data) =>
  Task.create({ title: data.title, user: userId });

exports.getTasks = (userId, userRole) => {
  if (userRole === "ADMIN") {
    return Task.find().populate("user", "email name");
  }
  return Task.find({ user: userId });
};

exports.updateTask = (taskId, userId, userRole, data) => {
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