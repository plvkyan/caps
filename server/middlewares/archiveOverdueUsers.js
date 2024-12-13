const Bill = require('../models/billModel')
const User = require('../models/userModel')

const archiveOverdueUsers = async (req, res, next) => {
    try {
        const threeMonthsAgo = new Date();
        threeMonthsAgo.setMonth(threeMonthsAgo.getMonth() - 3);

        // Add index hint and only select necessary fields
        const overdueBills = await Bill.aggregate([
            {
                $match: {
                    'billDueDate': { $lte: threeMonthsAgo },
                    'billPayors.billStatus': 'Overdue'
                }
            },
            {
                $unwind: '$billPayors'
            },
            {
                $match: {
                    'billPayors.billStatus': 'Overdue'
                }
            },
            {
                $group: {
                    _id: '$billPayors.payorBlkLt'
                }
            }
        ]).exec();

        const usersToArchive = overdueBills.map(bill => bill._id);

        if (usersToArchive.length > 0) {
            await User.updateMany(
                { 
                    userBlkLt: { $in: usersToArchive },
                    userVisibility: { $ne: 'Archived' } // Only update if not already archived
                },
                {
                    $set: {
                        userVisibility: 'Archived',
                        archiveDate: new Date()
                    }
                },
                { lean: true } // Use lean for better performance
            );
        }

        next();
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

module.exports = archiveOverdueUsers
