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

const upload = multer({ dest: 'uploads/' });

// Route Imports

// Reservation Route Import
const reservationRoutes = require('./routes/reservationRoutes')

// Amenity Route Import
const amenityRoutes = require('./routes/amenityRoutes')

// Bill Route Import
const billRoutes = require('./routes/billRoutes')

// Middleware Import
const checkOverdue = require('./middlewares/checkOverdue')
// const checkReservation = require('./middlewares/checkReservation')
const checkOutstanding = require('./middlewares/checkOutstanding')






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
 


app.use(express.json({limit: '15mb'}));
app.use(express.urlencoded({limit: '15mb', extended: true}));
app.use(express.json())
app.use(checkOverdue)
// app.use(checkReservation)
// app.use(checkOutstanding)
app.use((req, res, next) => {

    console.log(req.path, req.method)
    next()

})

// Routes
app.use('/api/announcements', announcementRoutes)
app.use('/api/users', userRoutes)
app.use('/api/reservations', reservationRoutes)
app.use('/api/amenities', amenityRoutes)
app.use('/api/webhooks', webhookRoutes)
app.use('/api/bills', billRoutes)
app.use('/api/emails', emailRoutes)


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




