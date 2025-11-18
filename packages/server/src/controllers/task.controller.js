import Task from "../models/Task.model.js";

export const createTask = async (req, res) => {
  const item = await Task.create(req.body);
  res.status(201).json(item);
};

export const getTasks = async (req, res) => {
  const list = await Task.find().sort({ createdAt: -1 });
  res.json(list);
};

export const getTask = async (req, res) => {
  const t = await Task.findById(req.params.id);
  if (!t) return res.status(404).json({ message: "Not found" });
  res.json(t);
};

export const updateTask = async (req, res) => {
  const t = await Task.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.json(t);
};

export const deleteTask = async (req, res) => {
  await Task.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted" });
};
