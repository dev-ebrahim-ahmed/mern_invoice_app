import Transaction from "../models/transaction.model.js";

export const getAllTransactions = async (req, res) => {
    try {
        const transactions = await Transaction.find();
        res.status(200).json(transactions);
    } catch (error) {
        console.log("Error in getAllTransactions controller", error.message);
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

export const createTransaction = async (req, res) => {
    const { type, amount, date, description, category } = req.body;
    try {
        if (!type || !amount || !date || !description || !category) {
            return res.status(400).json({ success: false, message: "All field required" });
        }
        const newTransaction = new Transaction({ type, amount, date, description, category });
        console.log(newTransaction);
        await newTransaction.save();
        return res.status(201).json({ success: true, message: "Transaction created successfully", transaction: newTransaction });
    } catch (error) {
        console.log("Error in createTransaction controller", error.message);
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

export const updateTransaction = async (req, res) => {
    try {
        const { id } = req.params;
        const { client, amount, duedate, description } = req.body;
        const transaction = await Transaction.findById(id);
        if (!transaction) {
            return res.status(404).json({ success: false, message: "Transaction not found" });
        }
        transaction.client = client;
        transaction.amount = amount;
        transaction.dueDate = duedate;
        transaction.description = description;
        await transaction.save();
        return res.status(200).json({ success: true, message: "Transaction updated successfully", transaction: transaction });
    } catch (error) {
        console.log("Error in updateTransaction controller", error.message);
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

export const deleteTransaction = async (req, res) => {
    try {
        const { id } = req.params;
        await Transaction.findByIdAndDelete(id);
        return res.status(200).json({ success: true, message: "Transaction deleted successfully" });
    } catch(error){
        console.log("Error in deleteTransaction controller", error.message);
        res.status(500).json({ message: "Server error", error: error.message });
    }
};
