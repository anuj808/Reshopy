import express from "express";
import {
  getPendingProducts,
  approveProduct,
  rejectProduct,
} from "./admin.controller.js";

import { protect, authorize } from "../../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/products", protect, authorize("admin"), getPendingProducts);
router.put("/approve/:id", protect, authorize("admin"), approveProduct);
router.put("/reject/:id", protect, authorize("admin"), rejectProduct);

export default router;