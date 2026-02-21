const Task = require("../models/Task");

exports.createTask = (userId, data) =>
  Task.create({ title: data.title, user: userId });

exports.getTasks = (userId) =>
  Task.find({ user: userId });

exports.updateTask = (taskId, userId, data) =>
  Task.findOneAndUpdate(
    { _id: taskId, user: userId },
    data,
    { new: true }
  );

exports.deleteTask = (taskId, userId) =>
  Task.findOneAndDelete({ _id: taskId, user: userId });