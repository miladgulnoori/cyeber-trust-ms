import Project from "../models/Project.model.js";

export const createProject = async (req, res) => {
  const p = await Project.create(req.body);
  res.json(p);
};

export const getProjects = async (req, res) => {
  const all = await Project.find();
  res.json(all);
};

export const getProject = async (req, res) => {
  const p = await Project.findById(req.params.id);
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
