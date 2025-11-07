import { Router } from "express";

const quotationRouter = Router();

// Create a new quotation
quotationRouter.post("/", async (req, res) => {
  // body: {clientName, projectDetails, amount, validity}
  res.send({ success: true, message: "Quotation created!" });
});

// Get all quotations
quotationRouter.get("/", async (req, res) => {
  res.send({ success: true, data: [] });
});

// Get single quotation by Id
quotationRouter.get("/:Id", async (req, res) => {
  const { Id } = req.params;
  res.send({ success: true, data: { Id } });
});

// Update quotation
quotationRouter.put("/:Id", async (req, res) => {
  const { Id } = req.params;
  res.send({ success: true, message: `Quotation ${Id} updated!` });
});

// Delete quotation
quotationRouter.delete("/:Id", async (req, res) => {
  const { Id } = req.params;
  res.send({ success: true, message: `Quotation ${Id} deleted!` });
});

export default quotationRouter;
