import { Router } from "express";

const costRouter = Router();

// Create a new cost entry
costRouter.post("/", async (req, res) => {
  // body: {amount, description, date, projectId}
  res.send({ success: true, message: "Cost entry created!" });
});

// Get all cost entries

costRouter.get("/", async (req, res) => {
  res.send({ success: true, data: [] });
});
// Get single cost entry by Id
costRouter.get("/:Id", async (req, res) => {
  const { Id } = req.params;
  res.send({ success: true, data: { Id } });
});
// Update cost entry
costRouter.put("/:Id", async (req, res) => {
  const { Id } = req.params;
  res.send({ success: true, message: `Cost entry ${Id} updated!` });
});
// Delete cost entry
costRouter.delete("/:Id", async (req, res) => {
  const { Id } = req.params;
  res.send({ success: true, message: `Cost entry ${Id} deleted!` });
});

export default costRouter;
