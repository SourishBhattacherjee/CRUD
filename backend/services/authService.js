const User = require("../models/User");
const bcrypt = require("bcrypt");
const { generateToken } = require("../utils/jwt");

exports.register = async ({ name, email, password, role }) => {
  const errors = [];
  if (!name || !name.trim()) errors.push({ field: "name", message: "Name is required" });
  if (!email || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) errors.push({ field: "email", message: "Valid email is required" });
  if (!password || password.length < 6) errors.push({ field: "password", message: "Password must be at least 6 characters" });

  if (errors.length) throw { message: "Validation failed", errors };

  const exists = await User.findOne({ email });
  if (exists) throw { message: "User already exists", errors: [{ field: "email", message: "Email already registered" }] };

  const hashed = await bcrypt.hash(password, 10);

  const user = await User.create({ name, email, password: hashed, role });

  return { token: generateToken(user) };
};

exports.login = async ({ email, password }) => {
  const errors = [];
  if (!email || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) errors.push({ field: "email", message: "Valid email is required" });
  if (!password) errors.push({ field: "password", message: "Password is required" });
  if (errors.length) throw { message: "Validation failed", errors };

  const user = await User.findOne({ email });
  if (!user) throw { message: "Invalid credentials" };

  const match = await bcrypt.compare(password, user.password);
  if (!match) throw { message: "Invalid credentials" };

  return { token: generateToken(user) };
};