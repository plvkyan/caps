const Bill = require('../models/billModel')
const User = require('../models/userModel')

const checkOverdueBills = async (req, res, next) => {
    try {
        // Find all bills where due date is less than or equal to today
        const currentDate = new Date()
        const overdueBills = await Bill.find({
            'billDueDate': { $lte: currentDate },
            'billPayors.billStatus': 'Pending'
        })

        // Update each overdue bill and associated users
        for (const bill of overdueBills) {
            // Update pending payors to overdue
            for (const payor of bill.billPayors) {
                if (payor.billStatus === 'Pending') {
                    await Bill.updateOne(
                        { 
                            _id: bill._id,
                            'billPayors.payorId': payor.payorId 
                        },
                        { 
                            $set: { 'billPayors.$.billStatus': 'Overdue' }
                        }
                    )

                    // Update user status to delinquent
                    await User.updateOne(
                        { userBlkLt: payor.payorBlkLt },
                        { $set: { userStatus: 'Delinquent' } }
                    )
                }
            }
        }

        // Find all users with delinquent status
        const delinquentUsers = await User.find({ userStatus: 'Delinquent' });

        // Check each delinquent user for overdue bills
        for (const user of delinquentUsers) {
            const hasOverdueBills = await Bill.exists({
                'billPayors.payorBlkLt': user.userBlkLt,
                'billPayors.billStatus': 'Overdue'
            });

            // If user has no overdue bills, update status to Outstanding
            if (!hasOverdueBills) {
                await User.updateOne(
                    { userBlkLt: user.userBlkLt },
                    { $set: { userStatus: 'Outstanding' } }
                );
            }
        }

        next()
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

module.exports = checkOverdueBills