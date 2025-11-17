import Department from "../models/Department.model.js";

export const createDepartment = async (req, res) => {
  const dep = await Department.create(req.body);
  res.json(dep);
};

export const getDepartments = async (req, res) => {
  const all = await Department.find();
  res.json(all);
};

export const getDepartment = async (req, res) => {
  const dep = await Department.findById(req.params.id);
  res.json(dep);
};

export const updateDepartment = async (req, res) => {
  const dep = await Department.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.json(dep);
};

export const deleteDepartment = async (req, res) => {
  await Department.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted" });
};
