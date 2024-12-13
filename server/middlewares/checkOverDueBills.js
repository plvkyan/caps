const Bill = require('../models/billModel')
const User = require('../models/userModel')

const checkOverdueBills = async (req, res, next) => {
    try {
        const currentDate = new Date()
        
        // Find all overdue bills in one query
        const overdueBills = await Bill.find({
            'billDueDate': { $lte: currentDate },
            'billPayors.billStatus': 'Pending'
        })

        if (overdueBills.length === 0) {
            return next()
        }

        // Prepare bulk operations
        const billBulkOps = []
        const userBulkOps = new Set()

        overdueBills.forEach(bill => {
            bill.billPayors.forEach(payor => {
                if (payor.billStatus === 'Pending') {
                    // Add bill update operation
                    billBulkOps.push({
                        updateOne: {
                            filter: {
                                _id: bill._id,
                                'billPayors.payorId': payor.payorId
                            },
                            update: {
                                $set: { 'billPayors.$.billStatus': 'Overdue' }
                            }
                        }
                    })

                    // Add unique user update operation
                    userBulkOps.add(payor.payorBlkLt)
                }
            })
        })

        // Execute bulk operations in parallel
        await Promise.all([
            Bill.bulkWrite(billBulkOps),
            User.updateMany(
                { userBlkLt: { $in: Array.from(userBulkOps) } },
                { $set: { userStatus: 'Delinquent' } }
            )
        ])

        next()
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

module.exports = checkOverdueBills