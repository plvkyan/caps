require('dotenv').config()

const cors = require('cors')
const express = require('express')
const mongoose = require('mongoose')
const announcementRoutes = require('./routes/announcementRoutes')
const userRoutes = require('./routes/userRoutes')
const paymentRoutes = require('./routes/paymentRoutes')
const webhookRoutes = require('./routes/webhookRoutes')

// Route Imports

// Reservation Route Import
const reservationRoutes = require('./routes/reservationRoutes')

// Amenity Route Import
const amenityRoutes = require('./routes/amenityRoutes')

// Bill Route Import
const billRoutes = require('./routes/billRoutes')

// Middleware Import
const checkOverdue = require('./middlewares/checkOverdue')
const checkReservation = require('./middlewares/checkReservation')
const checkOutstanding = require('./middlewares/checkOutstanding')






// Express App
const app = express()



// Middleware
app.use(cors({ origin: 5173 }))
app.use(express.json())
app.use(checkOverdue)
app.use(checkReservation)
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
// app.use('/api/payments', paymentRoutes)
app.use('/api/webhooks', webhookRoutes)
app.use('/api/bills', billRoutes)


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




