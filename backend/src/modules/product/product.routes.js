import express from "express";
import {
  addProduct,
  getProducts,
  getSellerProducts,
} from "./product.controller.js";
import { protect, authorize } from "../../middlewares/authMiddleware.js";


const router = express.Router();

// Seller adds product
router.post("/", protect, authorize("seller"), addProduct);

// Get all products (public or protected)
router.get("/", getProducts);
router.get("/my-products", protect, authorize("seller"), getSellerProducts);
export default router;