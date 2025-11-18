import { Router } from "express";
import {
  createCost,
  getCosts,
  getCost,
  updateCost,
  deleteCost,
} from "../controllers/cost.controller.js";

const router = Router();
router.post("/", createCost);
router.get("/", getCosts);
router.get("/:id", getCost);
router.put("/:id", updateCost);
router.delete("/:id", deleteCost);

export default router;
