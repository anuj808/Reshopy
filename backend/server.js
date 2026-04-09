import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./src/config/db.js";
import { protect } from "./src/middlewares/authMiddleware.js";
// Routes
import authRoutes from "./src/modules/auth/auth.routes.js";
import productRoutes from "./src/modules/product/product.routes.js";
dotenv.config();
import adminRoutes from "./src/modules/admin/admin.routes.js";

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// DB
connectDB();

// Routes
app.get("/", (req, res) => {
  res.send("Backend is running 🚀");
});
app.get("/api/test", protect, (req, res) => {
  res.json({
    message: "Protected route working ✅",
    user: req.user,
  });
});
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/admin", adminRoutes);
// Server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});