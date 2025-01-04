import mongoose from "mongoose"

const TransactionSchema = new mongoose.Schema({
    type: {
        type: String,
        enum: [
            'income',
            'expense'
        ],
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now,
        required: true
    }
});
const Transaction = mongoose.model('Transaction', TransactionSchema);
export default Transaction;