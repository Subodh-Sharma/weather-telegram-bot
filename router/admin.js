import express from "express";
import { adminLogin } from "../controllers/admin.js";

const router = express.Router();

router.post("/adminlogin",adminLogin);


export default router;