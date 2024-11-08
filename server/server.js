require('dotenv').config();

// Import dependencies
const cors = require('cors');
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const { fileURLToPath } = require('url');

// Import routes
const announcementRoutes = require('./routes/announcementRoutes');
const userRoutes = require('./routes/userRoutes');
const paymentRoutes = require('./routes/paymentRoutes');
const webhookRoutes = require('./routes/webhookRoutes');
const emailRoutes = require('./routes/emailRoutes');
const exportRoutes = require('./routes/exportRoutes');
const reservationRoutes = require('./routes/reservationRoutes');
const amenityRoutes = require('./routes/amenityRoutes');
const billRoutes = require('./routes/billRoutes');

// Import middlewares
// const checkOngoingReservation = require('./middlewares/checkOngoingReservation');
// const checkOutstanding = require('./middlewares/checkOutstanding');
const checkOverDueBills = require('./middlewares/checkOverDueBills');

// Initialize Express app
const app = express();

// Global Middleware
app.use(cors());

// File size checker middleware
app.use((req, res, next) => {
    if (!/^application\/json/.test(req.headers['content-type'])) {
        return next();
    }
    
    const size = +req.headers['content-length'] || 0;
    if (size > 15000000) {
        return res.status(413).json({ error: 'The total file size is too large: ' + size });
    }
    next();
});

// Body parser middleware
app.use(express.json({ limit: '30mb' }));
app.use(express.urlencoded({ limit: '30mb', extended: true }));

// Custom middleware
// app.use(checkOngoingReservation);
app.use(checkOverDueBills);

// Webhook endpoint for PayMongo
// app.post('/api/webhook', express.raw({type: 'application/json'}), (req, res) => {
//     const signature = req.headers['paymongo-signature'];
//     const webhookSecret = process.env.PAYMONGO_WEBHOOK_SECRET;

//     try {
//         const payload = JSON.parse(req.body.toString());
//         res.status(200).json({ received: true });
//     } catch (err) {
//         console.error('Webhook error:', err.message);
//         res.status(400).send(`Webhook Error: ${err.message}`);
//     }
// });

// app.post('/api/webhooks/', (req, res) => {
//     const webhookEvent = req.body;  // This will contain the event data sent by PayMongo
  
//     // Process the event data here (e.g., verify the event, update payment status)
//     console.log('Received webhook:', webhookEvent);
  
//     // Send an appropriate response to acknowledge receipt
//     res.status(200).send('Webhook received');
//   });


// API Routes
app.use('/api/announcements', announcementRoutes);
app.use('/api/users', userRoutes);
app.use('/api/reservations', reservationRoutes);
app.use('/api/amenities', amenityRoutes);
app.use('/api/webhooks', webhookRoutes);
app.use('/api/bills', billRoutes);
app.use('/api/emails', emailRoutes);
app.use('/api/exports', exportRoutes);

// Serve static files
app.use(express.static(path.join(__dirname, '../client/dist')));

// Catch all route for React app
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/dist/index.html'));
});

// Database connection and server startup
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        app.listen(process.env.PORT, () => {
            console.log('Connected to database and listening on port', process.env.PORT);
        });
    })
    .catch((err) => {
        console.log(err);
    });
