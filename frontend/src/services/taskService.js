import api from "../api";

export const getTasks = (token) =>
  api.get("/tasks", { headers: { Authorization: `Bearer ${token}` } }).then(r => r.data);

export const createTask = (token, payload) =>
  api.post("/tasks", payload, { headers: { Authorization: `Bearer ${token}` } }).then(r => r.data);

export const updateTask = (token, id, payload) =>
  api.put(`/tasks/${id}`, payload, { headers: { Authorization: `Bearer ${token}` } }).then(r => r.data);

export const deleteTask = (token, id) =>
  api.delete(`/tasks/${id}`, { headers: { Authorization: `Bearer ${token}` } }).then(r => r.data);
