import Invoice from "../models/invoice.model.js"

export const createInvoice = async (req, res) => {
    const { client, amount, dueDate, status } = req.body;
    console.log(client, amount, dueDate, status);
    try {
        if(!client || !amount || !dueDate || !status){
            return res.status(400).json({ success: false, message: "All field required"});
        }
        const newInvoice = new Invoice({ client, amount, dueDate, status});
        await newInvoice.save();
        return res.status(201).json({ success: true, message: "Invoice created successfully", invoice: newInvoice});
    } catch (error){
        console.log("Error in createInvoice controller", error.message);
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

export const getInvoice = async (req, res) => {
    try {

        const invoice = await Invoice.find().populate("client");
        
        if(!invoice){
            return res.status(404).json({ success: false, message: "Invoice not found"});
        }
        return res.status(200).json({ success: true, message: "Invoice found", invoice: invoice});
    } catch (error){
        console.log("Error in getInvoice controller", error.message);
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

export const updateInvoice = async (req, res) => {
    try {
        const { id } = req.params;
        const { client, amount, dueDate, status, description } = req.body;
        const invoice = await Invoice.findById(id);
        if(!invoice){
            return res.status(404).json({ success: false, message: "Invoice not found"});
        }
        invoice.client = client;
        invoice.amount = amount;
        invoice.dueDate = dueDate;
        invoice.status = status;
        invoice.description = description;
        await invoice.save();
        return res.status(200).json({ success: true, message: "Invoice updated successfully", invoice: invoice});
        
    } catch (error){
        console.log("Error in updateInvoice controller", error.message);
        res.status(500).json({ message: "Server error", error: error.message });
    }
};