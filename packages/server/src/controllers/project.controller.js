import Project from "../models/Project.model.js";

export const createProject = async (req, res) => {
  const p = await Project.create(req.body);
  res.status(201).json(p);
};

export const getProjects = async (req, res) => {
  const list = await Project.find().sort({ createdAt: -1 });
  res.json(list);
};

export const getProject = async (req, res) => {
  const p = await Project.findById(req.params.id);
  if (!p) return res.status(404).json({ message: "Not found" });
  res.json(p);
};

export const updateProject = async (req, res) => {
  const p = await Project.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.json(p);
};

export const deleteProject = async (req, res) => {
  await Project.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted" });
};
