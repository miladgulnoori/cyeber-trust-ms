import { Router } from "express";

const employeeRouter = Router();

// Create a new employee
employeeRouter.post("/", async (req, res) => {
  // body: {name, email, department}
  res.send({ success: true, message: "Employee created!" });
});

//Get all emoployees
employeeRouter.get("/", async (req, res) => {
  res.send({ success: true, data: [] });
});

//Get single emaployee by Id
employeeRouter.get("/:Id", async (req, res) => {
  const { Id } = req.params;
  res.send({ success: true, data: { Id } });
});

//Update employee
employeeRouter.put("/:Id", async (req, res) => {
  const { Id } = req.params;
  res.send({ success: true, message: `Employee ${Id} updated!` });
});

//Delete employee
employeeRouter.delete("/:Id", async (req, res) => {
  const { Id } = req.params;
  res.send({ success: true, message: `Employee ${Id} deleted!` });
});

export default employeeRouter;
