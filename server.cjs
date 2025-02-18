{/* 
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
require("dotenv").config();
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Route to verify bank account
app.post("/api/verify-bank", async (req, res) => {
    const { accountNumber, routingNumber, accountHolderName, bankName } = req.body;

    if (!accountNumber || !routingNumber || !accountHolderName) {
        return res.status(400).send({ error: "All fields are required." });
    }

    try {
        const token = await stripe.tokens.create({
            bank_account: {
                country: "US",
                currency: "usd",
                routing_number: routingNumber,
                account_number: accountNumber,
                account_holder_name: accountHolderName,
                account_holder_type: "individual", // or "company"
            },
        });

        console.log("Bank account verified. Token created:", token.id);

        res.status(200).send({ message: "Bank information verified successfully.", token: token.id });
    } catch (error) {
        console.error("Error verifying bank account:", error);
        res.status(500).send({ error: error.message || "Failed to verify bank information." });
    }
});

// Start server
const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
*/}

const express = require('express');
const cors = require('cors');
require('dotenv').config();
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY); // Using env variable for the key
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');

const app = express();
app.use(cors({
    origin: 'https://shashikala-foundation.netlify.app' // Replace with your actual Netlify URL
}));

app.use(bodyParser.json());

app.post('/create-payment-intent', async (req, res) => {
    try {
        const { amount, email } = req.body; // Capture email along with amount

        // Create a payment intent
        const paymentIntent = await stripe.paymentIntents.create({
            amount, // Amount in cents
            currency: 'usd',
        });

        // Send a success email to the user
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER, // Your email from .env
                pass: process.env.EMAIL_PASS, // Your email password from .env

            },
        });

        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: email,
            subject: 'Payment Confirmation',
            text: `Thank you for your payment of $${amount / 100}.`,
        };
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.log('Email error:', error);
            } else {
                console.log('Email sent:', info.response);
            }
        });

        res.status(200).send({
            clientSecret: paymentIntent.client_secret,
        });

    } catch (error) {
        res.status(500).send({
            error: error.message,
        });

    }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});