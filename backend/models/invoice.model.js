import mongoose from "mongoose";

const InvoiceSchema = new mongoose.Schema({
    client: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Client',
    },
    amount: {
        type: Number,
        required: true,
    },
    dueDate: {
        type: Date,
        required: true,
    },
    status: {
        type: String,
        enum: [
            'paid',
            'unpaid'
        ],
        default: 'unpaid' 
    }
});
const Invoice = mongoose.model('Invoice', InvoiceSchema);
export default Invoice;