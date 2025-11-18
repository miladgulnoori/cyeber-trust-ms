import { Router } from "express";
import {
  createQuotation,
  getQuotations,
  getQuotation,
  updateQuotation,
  deleteQuotation,
} from "../controllers/quotation.controller.js";

const router = Router();
router.post("/", createQuotation);
router.get("/", getQuotations);
router.get("/:id", getQuotation);
router.put("/:id", updateQuotation);
router.delete("/:id", deleteQuotation);

export default router;
