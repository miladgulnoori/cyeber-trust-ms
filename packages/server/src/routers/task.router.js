import { Router } from "express";

const taskRouter = Router();

// Create a new task
taskRouter.post("/", async (req, res) => {
  // body: {title, description, assignedTo, dueDate}
  res.send({ success: true, message: "Task created!" });
});
// Get all tasks
taskRouter.get("/", async (req, res) => {
  res.send({ success: true, data: [] });
});
// Get single task by Id
taskRouter.get("/:Id", async (req, res) => {
  const { Id } = req.params;
  res.send({ success: true, data: { Id } });
});
// Update task
taskRouter.put("/:Id", async (req, res) => {
  const { Id } = req.params;
  res.send({ success: true, message: `Task ${Id} updated!` });
});
// Delete task
taskRouter.delete("/:Id", async (req, res) => {
  const { Id } = req.params;
  res.send({ success: true, message: `Task ${Id} deleted!` });
});
export default taskRouter;
