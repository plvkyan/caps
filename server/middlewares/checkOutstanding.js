


const mongoose = require('mongoose')

const jwt = require('jsonwebtoken')
const Bill = require('../models/billModel')
const User = require('../models/userModel')
const fns = require('date-fns')





// This middleware is for checking if any bills are overdue
const checkOutstanding = async (req, res, next) => {



    try {



        const initBills = await Bill.find({}).sort({ createdAt: -1 })

        const initUsers = await User.find({}).sort({ createdAt: -1 })

        // When getting someone's unarchived bills, find those that are overdue
        // When a bill is overdue by 1 month, a user should be 'Delinquent'
        // When a bill is overdue by 3 months, a user should be  'For Archive'
        // const monthOverdueBills = initBills.filter(function (bill) {
        //     return fns.format(bill.billReceivers[0].billDue, "yyyy/MM/dd") >= fns.format(new Date(), "yyyy/MM/dd");
        // })

        const monthOverdueBills = initBills.filter((bill) => {

            for (let i = 0; i < bill.billReceivers.length; i++) {

                if (fns.format(bill.billReceivers[i].billDue, "yyyy/MM/dd") <= fns.format(new Date(), "yyyy/MM/dd")) {

                    return bill;

                }

            }
        })
        


        const delinquentUsers = monthOverdueBills.map((bill) => {

            for (let i = 0; i < bill.billReceivers.length; i++) {

                return bill.billReceivers[i].receiverBlkLt;

            }

        });

        console.log(delinquentUsers);

        const outstandingUsers = initUsers.filter((user) => {

            for (let i = 0; i < delinquentUsers.length; i++) {

                if (user.userBlkLt == delinquentUsers[i]) {

                    return user;

                }

            }

        });

        // const outstandingUsers = initUsers.map((user) => {

        //     for (let i = 0; i < initUsers.length; i++) {

        //         if (user.userBlkLt == delinquentUsers[i]) {

        //             return user.userBlkLt;

        //         }
        //     }

        // });

        console.log(outstandingUsers)

        // const outstandingFunction = outstandingUsers.map( async (userrr) => {

        //     await User.updateOne({ blkLt: userrr }, {memberStatus: "Outstanding"});

        // })


        console.log("Wow. Checking overdue bills worked.")
        next()

    } catch (error) {

        console.log(error)

    }




}






module.exports = checkOutstanding
