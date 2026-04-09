import express from "express";
import { phoneLogin } from "./auth.controller.js";

const router = express.Router();

// Phone login
router.post("/phone-login", phoneLogin);

export default router;