import Cost from "../models/Cost.model.js";

export const createCost = async (req, res) => {
  const c = await Cost.create(req.body);
  res.status(201).json(c);
};

export const getCosts = async (req, res) => {
  const list = await Cost.find().sort({ createdAt: -1 });
  res.json(list);
};

export const getCost = async (req, res) => {
  const c = await Cost.findById(req.params.id);
  if (!c) return res.status(404).json({ message: "Not found" });
  res.json(c);
};

export const updateCost = async (req, res) => {
  const c = await Cost.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.json(c);
};

export const deleteCost = async (req, res) => {
  await Cost.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted" });
};
