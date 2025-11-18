import Quotation from "../models/Quotation.model.js";

export const createQuotation = async (req, res) => {
  const q = await Quotation.create(req.body);
  res.status(201).json(q);
};

export const getQuotations = async (req, res) => {
  const list = await Quotation.find().sort({ createdAt: -1 });
  res.json(list);
};

export const getQuotation = async (req, res) => {
  const q = await Quotation.findById(req.params.id);
  if (!q) return res.status(404).json({ message: "Not found" });
  res.json(q);
};

export const updateQuotation = async (req, res) => {
  const q = await Quotation.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.json(q);
};

export const deleteQuotation = async (req, res) => {
  await Quotation.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted" });
};
