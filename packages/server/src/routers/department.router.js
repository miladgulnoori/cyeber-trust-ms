import { Router } from "express";

const departmentRouter = Router();

// Create a new department
departmentRouter.post("/", async (req, res) => {
  // body: {name, location}
  res.send({ success: true, message: "Department created!" });
});

// Get all departments
departmentRouter.get("/", async (req, res) => {
  res.send({ success: true, data: [] });
});

// Get single department by Id
departmentRouter.get("/:Id", async (req, res) => {
  const { Id } = req.params;
  res.send({ success: true, data: { Id } });
});

// Update department
departmentRouter.put("/:Id", async (req, res) => {
  const { Id } = req.params;
  res.send({ success: true, message: `Department ${Id} updated!` });
});

// Delete department
departmentRouter.delete("/:Id", async (req, res) => {
  const { Id } = req.params;
  res.send({ success: true, message: `Department ${Id} deleted!` });
});

export default departmentRouter;
