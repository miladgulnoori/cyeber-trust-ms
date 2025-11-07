import { Router } from "express";

const projectRouter = Router();

// Create a new project
projectRouter.post("/", async (req, res) => {
  // body: {name, description, startDate, endDate}
  res.send({ success: true, message: "Project created!" });
});
// Get all projects
projectRouter.get("/", async (req, res) => {
  res.send({ success: true, data: [] });
});
// Get single project by Id
projectRouter.get("/:Id", async (req, res) => {
  const { Id } = req.params;
  res.send({ success: true, data: { Id } });
});
// Update project
projectRouter.put("/:Id", async (req, res) => {
  const { Id } = req.params;
  res.send({ success: true, message: `Project ${Id} updated!` });
});

// Delete project
projectRouter.delete("/:Id", async (req, res) => {
  const { Id } = req.params;
  res.send({ success: true, message: `Project ${Id} deleted!` });
});

export default projectRouter;
