const express = require('express');
const cors = require('cors');
const stripe = require('stripe')('sk_test_51Q1XcZP6Zzgt2hEQNVjlWtIWcbF4qwRXpMxzB9A37ZAqdoDFcmYSXjeYxS2PPgInj1I55BOCnNU7GSSuDG98Q13G00tzOBoPmV'); // Replace with your Stripe Secret Key
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer'); // Add nodemailer for email notifications

const app = express();
app.use(cors());
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
                user: 'your-email@gmail.com', // Replace with your email
                pass: 'your-email-password',  // Replace with your email password
            },
        });

        const mailOptions = {
            from: 'your-email@gmail.com',
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
