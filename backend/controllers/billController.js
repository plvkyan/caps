


const mongoose = require('mongoose')



const Bill = require("../models/billModel")
const User = require("../models/userModel")





// GET all bills regardless of status
const getBills = async (req, res) => {

    const initBills = await Bill.find({}).sort({ createdAt: -1 })

    res.status(200).json(initBills)

}



// GET all unarchived bills
const getUnarchivedBills = async (req, res) => {

    const initBills = await Bill.find({}).sort({ createdAt: -1 })

    const bills = initBills.filter(function (bill) {
        return bill.stat === "Unarchived";
    });

    res.status(200).json(bills)

}



// GET all archived bills
const getArchivedBills = async (req, res) => {

    const initBills = await Bill.find({}).sort({ createdAt: -1 })

    const bills = initBills.filter(function (bill) {
        return bill.stat === "Archived";
    });

    res.status(200).json(bills)

}



// GET all of someone's unarchived bills
const getUserBills = async (req, res) => {

    const { blkLt } = req.params

    const initBills = await Bill.find({}).sort({ createdAt: -1 })

    const unarchivedBills = initBills.filter(function (bill) {
        return bill.stat === "Unarchived";
    });

    

    const bills = unarchivedBills.filter(function (bill) {   

        for (let i = 0; i < bill.billReceivers.length; i++) {
            if (bill.billReceivers[0].receiverBlkLt == blkLt) {
                return true;
            }
        }

    });
    



    // // When getting someone's unarchived bills, find those that are overdue
    // // When a bill is overdue by 1 month, a user should be 'Delinquent'
    // // When a bill is overdue by 3 months, a user should be  'For Archive'
    // const monthOverdueBills = bills.filter(function (bill) {
    //     return bill.billReceivers.billDue >= bill.billReceivers.billDue.getMonth();
    // })

    // // If an overdue bill exists, you know the drill
    // if (monthOverdueBills) {
    //     const updateUser = await User.findOneAndUpdate({ blkLt: blkLt }, {
    //         memberStatus: "Delinquent"
    //     })
    // }

    // const threeMonthsOverdueBills = bills.filter(function (bill) {
    //     return bill.billReceivers.billDue >= bill.billReceivers.billDue.getMonth() + 3;
    // })

    // if (threeMonthsOverdueBills) {
    //     const updateUser = await User.findOneAndUpdate({ blkLt: blkLt }, {
    //         memberStatus: "For Archive"
    //     })
    // }


    
    res.status(200).json(bills)
}



// GET a single bill
const getBill = async (req, res) => {

    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: "No such bill" })
    }

    const bill = await Bill.findById(id)

    if (!bill) {
        return res.status(404).json({ error: "No such bill" })
    }

    res.status(200).json(bill)

}



// CREATE a new bill
const createBill = async (req, res) => {

    const { billName, billDescription, billQuantity, billCurrency, billAmount, billReceivers, billMadeby, billMadeDate, stat } = req.body

    try {

        // Add document to database
        const bill = await Bill.create({ billName, billDescription, billQuantity, billCurrency, billAmount, billReceivers, billMadeby, billMadeDate, stat })
        res.status(200).json(bill)

    } catch (error) {

        res.status(400).json({ error: error.message })

    }

}



// DELETE a bill
const deleteBill = async (req, res) => {

    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ error: 'No such bill' })
    }

    const bill = await Bill.findOneAndDelete({ _id: id })

    if (!bill) {
        return res.status(400).json({ error: 'No such bill' })
    }

    res.status(200).json(bill)

}



// UPDATE a bill
const updateBill = async (req, res) => {

    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ error: 'No such bill' })
    }

    const bill = await Bill.findOneAndUpdate({ _id: id }, {
        ...req.body
    })

    if (!bill) {
        return res.status(400).json({ error: 'No such bill' })
    }

    res.status(200).json(bill)

}




module.exports = {
    createBill,
    deleteBill,
    getArchivedBills,
    getBill,
    getBills,
    getUnarchivedBills,
    getUserBills,
    updateBill,
}