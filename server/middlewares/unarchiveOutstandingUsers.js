const Bill = require('../models/billModel')
const User = require('../models/userModel')

const unarchiveOutstandingUsers = async (req, res, next) => {
    try {
        const threeMonthsAgo = new Date();
        threeMonthsAgo.setMonth(threeMonthsAgo.getMonth() - 3);

        // Get all users with overdue bills older than 3 months
        const usersWithOldBills = await Bill.distinct('billPayors.payorBlkLt', {
            'billDueDate': { $lte: threeMonthsAgo },
            'billPayors.billStatus': 'Overdue'
        });

        // Find archived users that are not in the usersWithOldBills list
        const usersToUnarchive = await User.updateMany(
            {
                userVisibility: 'Archived',
                userBlkLt: { $nin: usersWithOldBills }
            },
            {
                $set: { userVisibility: 'Unarchived' },
                $unset: { archiveDate: "" }
            }
        );

        next();
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

module.exports = unarchiveOutstandingUsers;
