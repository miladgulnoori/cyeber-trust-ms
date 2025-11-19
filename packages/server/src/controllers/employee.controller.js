import Employee from "../models/Employee.model.js";

export const createEmployee = async (req, res) => {
  const emp = await Employee.create(req.body);
  res.status(201).json(emp);
};

export const getEmployees = async (req, res) => {
  const list = await Employee.find().sort({ createdAt: -1 });
  res.json(list);
};

export const getEmployee = async (req, res) => {
  const emp = await Employee.findById(req.params.id);
  if (!emp) return res.status(404).json({ message: "Not found" });
  res.json(emp);
};

export const updateEmployee = async (req, res) => {
  const emp = await Employee.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.json(emp);
};

export const deleteEmployee = async (req, res) => {
  await Employee.findByIdAndDelete(req.params.id);
  res.json({ message: "Employee deleted" });
};
