import express from "express";
import dotenv from "dotenv";

import authRoute from "./routes/auth.route.js";
import invoiceRoute from "./routes/invoice.route.js"
import transactionRoute from "./routes/transaction.route.js"

import { connectDB } from "./db/connectDB.js";
import cookieParser from "cookie-parser";

const app = express();
dotenv.config();

const PORT = process.env.PORT || 3002;

app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoute)
app.use("/api/invoice", invoiceRoute);
app.use("/api/transactions", transactionRoute)

app.listen(PORT, () => {
    connectDB();
    console.log(`Server is Running at http://localhost:${PORT}`);
});