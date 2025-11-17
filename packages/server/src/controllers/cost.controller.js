import Cost from "../models/Cost.model.js";

export const createCost = async (req, res) => {
  const c = await Cost.create(req.body);
  res.json(c);
};

export const getCosts = async (req, res) => {
  const all = await Cost.find();
  res.json(all);
};

export const getCost = async (req, res) => {
  const c = await Cost.findById(req.params.id);
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
