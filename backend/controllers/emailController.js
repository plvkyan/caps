


// Imports
// Import date-fns for formatting dates
const fns = require('../node_modules/date-fns')

// Import mailgen for generating the email itself
const mailgen = require('mailgen');

// Import nodemailer for sending emails
const nodemailer = require('nodemailer');







// The template and the brand details
const MailGenerator = new mailgen({
    theme: 'default',
    product: {
        name: "Grand Cedar Homes Homeowners Association",
        link: "https://www.facebook.com/RlphndrwDrgl",
        logo: "https://i.ibb.co/H71jFQb/grand-cedar-homes-new-logo-light-mode.png",
        logoHeight: "72px",
    }
});






// Controller for sending emails
const reservationConfirmationEmail = async (req, res) => {

    // Using all reservation details for the email
    const {
        blkLt,
        blkLtPosition,
        amenityAddress,
        amenityName,
        amenityType,
        reservationComment,
        reservationCommentSubject,
        reservationDate,
        reservationQuantity,
        reservationReason,
        reservationStatus,
        reserveeEmail,
        interactedBy,
        interactionDate,
        interactedByPosition,
        stat
    } = req.body;

    // Test Account for sending emails
    const testAccount = await nodemailer.createTestAccount();

    // SMTP Transport Details
    const transporter = nodemailer.createTransport({

        // host: 'mxslurp.click',
        // port: 2525,
        // auth: {
        //     user: "gctms@mailslurp.net",
        //     pass: "OJl6zIzG2YqOgMX1ZhyTfCDuX3wOaBo5"
        // }

        host: 'smtp.ethereal.email',
        port: 587,
        secure: false,
        auth: {
            user: testAccount.user,
            pass: testAccount.pass
        },

    });


    // The email content for equipment reservation approvals 
    let responseEquipment = {
        body: {
            name: blkLt,
            intro: "Your reservation for " + amenityName + " on " + fns.format(reservationDate, "PPPP") + " has been approved by " + interactedByPosition + " " + interactedBy + " on " + fns.format(interactionDate, "PPP") + ".",
            greeting: "Dear, ",
            signature: "Regards",
            table: {
                data: [
                    {
                        equipment: amenityName,
                        quantity: reservationQuantity + "x",
                        reservationDate: fns.format(reservationDate, "PPP"),
                        status: reservationStatus
                    }
                ]
            },
            outro: "Thank you! Remember that reparations are in hand for any damages to the equipment. They should be returned in full within 24 hours after the reservation. Your actions could affect your future reservations. Please be responsible."
        }
    }

    // The email content for facility reservation approvals
    let responseFacility = {
        body: {
            name: blkLt,
            intro: "Your reservation for " + amenityName + " on " + fns.format(reservationDate, "PPPP") + " has been approved. It was approved by " + interactedBy + " on " + fns.format(interactionDate, "PPP") + ".",
            greeting: "Dear, ",
            signature: "Regards",
            table: {
                data: [
                    {
                        facility: amenityName,
                        reservationDate: fns.format(reservationDate, "PPP"),
                        status: reservationStatus,
                    }
                ]
            },
            outro: "Thank you! Remember that reparations are in hand for any damages to the facility. Clean as you go and be mindful of your surroundings. Your actions could affect your future reservations. Please be responsible."
        }
    }

    // Generate an stylized HTML email using the content above
    let mailContent;

    // If equipments are reserved use this
    if (amenityType === "Equipment") {
        mailContent = MailGenerator.generate(responseEquipment);
        // Otherwise use this
    } else if (amenityType === "Facility") {
        mailContent = MailGenerator.generate(responseFacility);
    }

    // Other email information such as sender and receiver details, subject, and the stylized HTML
    const email = {
        from: '"Grand Cedar Homeowners Association" <gctms@example.com>',
        to: reserveeEmail,
        subject: "Reservation Approved",
        text: 'Reservation approved.',
        html: mailContent,
    }

    // The process of sending the email
    transporter.sendMail(email).then((info) => {

        // Outputting the test link --- for testing
        console.log(nodemailer.getTestMessageUrl(info));

        return res.status(201)
            .json({
                msg: "Email sent.",
                info: info.messageId,
                previewURL: nodemailer.getTestMessageUrl(info),
            });

    }).catch((err) => {
        return res.status(400).json({ err });
    });

}

const reservationRejectionEmail = async (req, res) => {

    // Using all reservation details for the email
    const {
        blkLt,
        blkLtPosition,
        amenityAddress,
        amenityName,
        amenityType,
        reservationComment,
        reservationCommentSubject,
        reservationDate,
        reservationQuantity,
        reservationReason,
        reservationStatus,
        reserveeEmail,
        interactedBy,
        interactionDate,
        interactedByPosition,
        stat
    } = req.body;

    // Test Account for sending emails
    const testAccount = await nodemailer.createTestAccount();

    // SMTP Transport Details
    const transporter = nodemailer.createTransport({

        // host: 'mxslurp.click',
        // port: 2525,
        // auth: {
        //     user: "gctms@mailslurp.net",
        //     pass: "OJl6zIzG2YqOgMX1ZhyTfCDuX3wOaBo5"
        // }

        host: 'smtp.ethereal.email',
        port: 587,
        secure: false,
        auth: {
            user: testAccount.user,
            pass: testAccount.pass
        },

    });


    // The email content for equipment reservation approvals 
    let responseEquipment = {
        body: {
            name: blkLt,
            intro: "Your reservation for " + amenityName + " on " + fns.format(reservationDate, "PPPP") + " has been rejected by " + interactedByPosition + " " + interactedBy + " on " + fns.format(interactionDate, "PPP") + ".",
            greeting: "Dear, ",
            signature: "Regards",
            table: {
                data: [
                    {
                        equipment: amenityName,
                        quantity: reservationQuantity + "x",
                        reservationDate: fns.format(reservationDate, "PPP"),
                        status: reservationStatus
                    }
                ]
            },
            outro: [
                reservationCommentSubject + "–" + reservationComment,
                "Above should be the reason for the rejection. Please take note of the following and make the necessary adjustments for your future reservations. If there are no explanations, some common reasons for rejection are: someone else has reserved the equipment first, the equipment is unavailable, poor bill and reservation records, among others. Consider trying to reserve again or contacting the association personally. Thank you for your consideration.",
            ]
        }
    }

    // The email content for facility reservation approvals
    let responseFacility = {
        body: {
            name: blkLt,
            intro: "Your reservation for " + amenityName + " on " + fns.format(reservationDate, "PPPP") + " has been rejected. It was rejected by " + interactedBy + " on " + fns.format(interactionDate, "PPP") + ".",
            greeting: "Dear, ",
            signature: "Regards",
            table: {
                data: [
                    {
                        facility: amenityName,
                        reservationDate: fns.format(reservationDate, "PPP"),
                        status: reservationStatus,
                    }
                ]
            },
            outro: [
                reservationCommentSubject + "–" + reservationComment,
                "Above should be the reason for the rejection. Please take note of the following and make the necessary adjustments for your future reservations. If there are no explanations, some common reasons for rejection are: someone else has reserved the equipment first, the equipment is unavailable, poor bill and reservation records, among others. Consider trying to reserve again or contacting the association personally. Thank you for your consideration.",
            ]
        }
    }

    // Generate an stylized HTML email using the content above
    let mailContent;

    // If equipments are reserved use this
    if (amenityType === "Equipment") {
        mailContent = MailGenerator.generate(responseEquipment);
        // Otherwise use this
    } else if (amenityType === "Facility") {
        mailContent = MailGenerator.generate(responseFacility);
    }

    // Other email information such as sender and receiver details, subject, and the stylized HTML
    const email = {
        from: '"Grand Cedar Homeowners Association" <gctms@example.com>',
        to: reserveeEmail,
        subject: "Reservation Rejected",
        text: 'Reservation rejected.',
        html: mailContent,
    }

    // The process of sending the email
    transporter.sendMail(email).then((info) => {

        // Outputting the test link --- for testing
        console.log(nodemailer.getTestMessageUrl(info));

        return res.status(201)
            .json({
                msg: "Email sent.",
                info: info.messageId,
                previewURL: nodemailer.getTestMessageUrl(info),
            });

    }).catch((err) => {
        return res.status(400).json({ err });
    });

}

const billNotificationEmail = async (req, res) => {

    const {
        billName,
        billDescription,
        billQuantity,
        billCurrency,
        billAmount,
        billReceivers,
        billMadeby,
        billMadeDate,
        stat
    } = req.body;

    // Test Account for sending emails
    const testAccount = await nodemailer.createTestAccount();

    // SMTP Transport Details
    const transporter = nodemailer.createTransport({

        // host: 'mxslurp.click',
        // port: 2525,
        // auth: {
        //     user: "gctms@mailslurp.net",
        //     pass: "OJl6zIzG2YqOgMX1ZhyTfCDuX3wOaBo5"
        // }

        host: 'smtp.ethereal.email',
        port: 587,
        secure: false,
        auth: {
            user: testAccount.user,
            pass: testAccount.pass
        },

    });


    let newbillResponse = {
        body: {
            name: blkLt,
            intro: "You have a new bill: " + billName + " created on " + fns.format(billMadeDate, "PPP") + ".",
            greeting: "Dear, ",
            signature: "Regards",
            table: {
                data: [
                    {
                        bill: billName,
                        quantity: billQuantity + "x",
                        currency: billCurrency,
                        amount: billAmount,
                        madeby: billMadeby,
                        madeDate: fns.format(billMadeDate, "PPP"),
                        status: stat
                    }
                ]
            }
        }
    }

}

const billConfirmationEmail = async (req, res) => {
}

const billFailureEmail = async (req, res) => {
}




module.exports = {
    reservationConfirmationEmail,
    reservationRejectionEmail,
    billNotificationEmail,
    billConfirmationEmail,
    billFailureEmail,
}