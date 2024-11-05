


// Requires
// 
const mongoose = require('mongoose')



// Models
// Bill model
const Bill = require("../models/billModel")
const BillPreset = require("../models/billPresetModel")

// User model
const User = require("../models/userModel")





// Functions

// GET functions
// GET all bills regardless of status
const getBills = async (req, res) => {
    try {
        const bills = await Bill.find().sort({ createdAt: -1 }).lean();
        res.status(200).json(bills);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// GET all unarchived bills
const getUnarchivedBills = async (req, res) => {
    try {
        const bills = await Bill.find({ billVisibility: "Unarchived" })
            .sort({ createdAt: -1 })
            .lean();
        res.status(200).json(bills);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// GET all archived bills
const getArchivedBills = async (req, res) => {
    try {
        const bills = await Bill.find({ billVisibility: "Archived" })
            .sort({ createdAt: -1 })
            .lean();
        res.status(200).json(bills);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// GET all of someone's unarchived bills
const getUserBills = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: "Invalid user ID" });
    }

    try {
        const bills = await Bill.find({
            billVisibility: "Unarchived",
            "billPayors.payorId": id  // Simplified query syntax
        })
        .sort({ createdAt: -1 })
        .lean();  // Add lean() for better performance

        res.status(200).json(bills);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// GET a single bill
const getBill = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: "Invalid bill ID" });
    }

    try {
        const bill = await Bill.findById(id).lean();
        
        if (!bill) {
            return res.status(404).json({ error: "Bill not found" });
        }

        res.status(200).json(bill);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const getUnarchivedBillPresets = async (req, res) => {
    try {
        const billPresets = await BillPreset.find({ billPresetVisibility: "Unarchived" })
            .sort({ createdAt: -1 })
            .lean();
        res.status(200).json(billPresets);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}




// POST functions
// CREATE a new bill
const createBill = async (req, res) => {
    const { 
        billTitle,
        billType,
        billDescription,
        billQuantity,
        billCurrency,
        billAmount,
        billRecurringDate,
        billDueDate,
        billPayors,
        billCreatorId,
        billCreatorBlkLt,
        billCreatorPosition
    } = req.body;

    try {
        const bill = await Bill.create({
            billTitle,
            billType,
            billDescription,
            billQuantity,
            billCurrency,
            billAmount,
            billRecurringDate,
            billDueDate,
            billPayors,
            billCreatorId,
            billCreatorBlkLt,
            billCreatorPosition
        });

        res.status(201).json(bill);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}
// CREATE a new bill preset
const createBillPreset = async (req, res) => {
    const { 
        billPresetTitle,
        billPresetType,
        billPresetDescription,
        billPresetQuantity,
        billPresetCurrency,
        billPresetAmount,
        billPresetRecurringDate,
        billPresetCreatorId,
        billPresetCreatorBlkLt,
        billPresetCreatorPosition,
        billPresetVisibility
    } = req.body;

    try {
        const billPreset = await BillPreset.create({
            billPresetTitle,
            billPresetType,
            billPresetDescription,
            billPresetQuantity,
            billPresetCurrency,
            billPresetAmount,
            billPresetRecurringDate,
            billPresetCreatorId,
            billPresetCreatorBlkLt,
            billPresetCreatorPosition,
            billPresetVisibility
        });

        res.status(201).json(billPreset);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}




// DELETE functions
// DELETE a bill
const deleteBill = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: "Invalid bill ID" });
    }

    try {
        const bill = await Bill.findByIdAndDelete(id);
        
        if (!bill) {
            return res.status(404).json({ error: "Bill not found" });
        }

        res.status(200).json(bill);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}



// PATCH functions
// UPDATE a bill
const updateBill = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: "Invalid bill ID" });
    }

    try {
        const bill = await Bill.findByIdAndUpdate(
            id,
            { ...req.body },
            { new: true, runValidators: true }
        ).lean();

        if (!bill) {
            return res.status(404).json({ error: "Bill not found" });
        }

        res.status(200).json(bill);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}




module.exports = {



    // GET functions
    getUnarchivedBillPresets,



    // POST functions
    createBillPreset,
    createBill,
    deleteBill,
    getArchivedBills,
    getBill,
    getBills,
    getUnarchivedBills,
    getUserBills,
    updateBill,
}