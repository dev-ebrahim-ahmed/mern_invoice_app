import express from "express";
import { verifyToken } from "../middleware/verifyToken.js";
import { createTransaction, deleteTransaction, getAllTransactions } from "../controllers/transaction.controller.js";

const router = express.Router();

router.get("/transactions-history", verifyToken, getAllTransactions);
router.post("/create-transaction", verifyToken, createTransaction);
router.delete("/delete-transaction/:id", verifyToken, deleteTransaction);

export default router;