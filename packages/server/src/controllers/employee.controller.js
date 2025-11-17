import Employee from "../models/Employee.model.js";

export const createEmployee = async (req, res) => {
  const emp = await Employee.create(req.body);
  res.json(emp);
};

export const getEmployees = async (req, res) => {
  const all = await Employee.find();
  res.json(all);
};

export const getEmployee = async (req, res) => {
  const emp = await Employee.findById(req.params.id);
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
  res.json({ message: "Deleted" });
};
