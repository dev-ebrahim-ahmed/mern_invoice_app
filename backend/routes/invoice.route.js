import express from "express";
import { verifyToken } from "../middleware/verifyToken.js";
import { getInvoice, createInvoice, updateInvoice } from "../controllers/invoice.controller.js";

const router = express.Router();

router.get("/get-invoice", verifyToken,  getInvoice);
router.post("/create-invoice", verifyToken, createInvoice);
router.put("/update-invoice/:id", verifyToken, updateInvoice);  

export default router;