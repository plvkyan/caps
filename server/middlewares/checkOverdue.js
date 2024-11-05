


const mongoose = require('mongoose')

const jwt = require('jsonwebtoken')
const Bill = require('../models/billModel')
const User = require('../models/userModel')
const fns = require('../node_modules/date-fns')





// This middleware is for checking if any bills are overdue
const checkOverdue = async (req, res, next) => {



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

                if ((fns.format(bill.billReceivers[i].billDue, "yyyy/MM/dd") <= fns.format(new Date(), "yyyy/MM/dd"))) {

                    return bill;

                }

            }
        })



        const delinquentUsers = monthOverdueBills.map((bill) => {

            for (let i = 0; i < bill.billReceivers.length; i++) {

                if (bill.billReceivers[i].billStatus != "Paid") {
                        
                    return bill.billReceivers[i].receiverBlkLt;
                    
                }

            }

        });

        const outstandingUsers = initUsers.filter((user) => {

            if (!delinquentUsers.includes(user.userBlkLt)) {

                return user;

            }

        });



        const delinquentFunction = delinquentUsers.map( async (user) => {

            await User.updateOne({ blkLt: user }, {memberStatus: "Delinquent"});

        })


        

        const outstandingFunction = outstandingUsers.map( async (user) => {

            await User.updateOne({ blkLt: user.userBlkLt }, {memberStatus: "Outstanding"});

        });



        // const threeMonthsOverdueBills = initBills.filter(function (bill) {
        //     return bill.billReceivers.billDue <= new Date(new Date().setMonth(bill.billReceivers.billDue.getMonth() + 3));
        // })

        // const archivedUsers = threeMonthsOverdueBills.map((bill) => {

        //     for (let i = 0; i < bill.billReceivers.length; i++) {

        //         if (bill.billReceivers[i].billStatus != "Paid") {
                        
        //             return bill.billReceivers[i].receiverBlkLt;
                    
        //         }

        //     }

        // });

        // const archiveFunction = archivedUsers.map( async (user) => {

        //     await User.updateOne({ blkLt: user }, {memberStatus: "Delinquent", stat: "Archived"});

        // })


        // for (let i = 0; i < delinquentUsers.length; i++) {

        //     console.log(delinquentFunction[i]);
        //     User.updateOne({ blkLt: delinquentUsers[i] }, {memberStatus: "num2"});

        // }



        // // If an overdue bill exists, you know the drill
        // if (delinquentUsers) {
        //     delinquentUsers.forEach(
        //         (user) => User.findOneAndUpdate(
        //             { blkLt: user },
        //             { memberStatus: "num3" }
        //         )
        //     )
        // }

        console.log("Wow. Checking overdue bills worked.")
        next()

    } catch (error) {

        console.log(error)

    }




}






module.exports = checkOverdue
