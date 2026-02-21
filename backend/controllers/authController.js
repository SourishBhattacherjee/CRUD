const authService = require("../services/authService");
const { validationResult } = require("express-validator");

exports.register = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      message: "Validation failed",
      errors: errors.array().map((e) => ({ field: e.param, message: e.msg })),
    });
  }
  try {
    const data = await authService.register(req.body);
    res.json(data);
  } catch (err) {
    if (err && err.errors) return res.status(400).json(err);
    res.status(400).json({ message: err.message });
  }
};

exports.login = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      message: "Validation failed",
      errors: errors.array().map((e) => ({ field: e.param, message: e.msg })),
    });
  }
  try {
    const data = await authService.login(req.body);
    res.json(data);
  } catch (err) {
    if (err && err.errors) return res.status(400).json(err);
    res.status(400).json({ message: err.message });
  }
};