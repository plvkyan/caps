require('dotenv').config()

const cors = require('cors')
const express = require('express')
const mongoose = require('mongoose')
const multer = require('multer');
const announcementRoutes = require('./routes/announcementRoutes')
const userRoutes = require('./routes/userRoutes')
const paymentRoutes = require('./routes/paymentRoutes')
const webhookRoutes = require('./routes/webhookRoutes')
const emailRoutes = require('./routes/emailRoutes')
const exportRoutes = require('./routes/exportRoutes')

const upload = multer({ dest: 'uploads/' });

const path = require('path');
const fileURLtoPath = require('url').fileURLToPath;

// Route Imports

// Reservation Route Import
const reservationRoutes = require('./routes/reservationRoutes')

// Amenity Route Import
const amenityRoutes = require('./routes/amenityRoutes')

// Bill Route Import
const billRoutes = require('./routes/billRoutes')

// Email Route Import
// const emailRoutes = require('./routes/emailRoutes')

// Middleware Import
// const checkOverdue = require('./middlewares/checkOverdue')

// const exportRoutes = require('./routes/exportRoutes')

// const checkReservation = require('./middlewares/checkReservation')
const checkOutstanding = require('./middlewares/checkOutstanding')

const checkOngoingReservation = require('./middlewares/checkOngoingReservation')




// Express App
const app = express()



// Middleware

app.use(cors({ origin: 5173 }))

app.use((req, res, next) => {

    // Contents other than json don't have a size limit
    // So just continue with the next handler in the chain
    if (!/^application\/json/.test(req.headers['content-type'])) {
        return next();
    }
 
    // Get the size from content-length header
    let size = +req.headers['content-length'] || 0;
    // If it's too big, return an error status
    if (size > 15000000) {
        return res.status(413).json({error: 'The total file size is too large: ' + size});
    }
 
    // Continue with the next handler in the chain
    next(); 
 });
 


app.use(express.json({limit: '30mb'}));
app.use(express.urlencoded({limit: '30mb', extended: true}));
app.use(express.json())
// app.use(checkOverdue)
// app.use(checkReservation)
// app.use(checkOutstanding)
app.use(checkOngoingReservation)
// app.use((req, res, next) => {
//     // console.log(req.path, req.method)
//     next()
// })

// Routes
app.use('/api/announcements', announcementRoutes)
app.use('/api/users', userRoutes)
app.use('/api/reservations', reservationRoutes)
app.use('/api/amenities', amenityRoutes)
app.use('/api/webhooks', webhookRoutes)
app.use('/api/bills', billRoutes)
app.use('/api/emails', emailRoutes)
app.use('/api/exports', exportRoutes);

app.use(express.static(path.join(__dirname, '../client/dist')));

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/dist/index.html'))
});

// app.get("/*", function (req, res) {
//     res.sendFile(
//         path.join(__dirname, "../client/build", "index.html"),
//         function (err) {
//             if (err) {
//                 res.status(500).send
//             }
//         }
//     );
// });


// Connect to DB
mongoose.connect(process.env.MONGO_URI)
    .then(() => {

        // Listen for requests
        app.listen(process.env.PORT, () => {
            console.log('connected to the database and listening on port', process.env.PORT);
        })

    })
    .catch((err) => {
        console.log(err)
    })




