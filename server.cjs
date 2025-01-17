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
