const Bill = require('../models/billModel')
const User = require('../models/userModel')

const checkOutstanding = async (req, res, next) => {
    try {
        // Use aggregation to find delinquent users without overdue bills
        const usersToUpdate = await User.aggregate([
            // Match delinquent users
            { $match: { userStatus: 'Delinquent' } },
            // Lookup bills for each user
            {
                $lookup: {
                    from: 'bills',
                    let: { userBlkLt: '$userBlkLt' },
                    pipeline: [
                        {
                            $match: {
                                $expr: {
                                    $and: [
                                        { $in: ['$$userBlkLt', '$billPayors.payorBlkLt'] },
                                        { $in: ['Overdue', '$billPayors.billStatus'] }
                                    ]
                                }
                            }
                        }
                    ],
                    as: 'overdueBills'
                }
            },
            // Filter users with no overdue bills
            { $match: { overdueBills: { $size: 0 } } },
            // Project only needed field
            { $project: { userBlkLt: 1 } }
        ]);

        // If there are users to update, do a bulk update
        if (usersToUpdate.length > 0) {
            await User.updateMany(
                { userBlkLt: { $in: usersToUpdate.map(u => u.userBlkLt) } },
                { $set: { userStatus: 'Outstanding' } }
            );
        }

        next();
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

module.exports = checkOutstanding