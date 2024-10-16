import React, { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import './PaymentPage.css'; // Importing the external CSS file
import { useLocation } from 'react-router-dom';
import Footer from './Footer';

// Initialize Stripe
const stripePromise = loadStripe('pk_test_51Q1XcZP6Zzgt2hEQ5m35c1OTyPcDXFPGaO8VismRhL4mwsvmxnwNYMPPmf6VucVhD8eiA3U9iGNT1bLKxeHrrKvf0072xT6uwG');

const Modal = ({ isOpen, onClose, message }) => {
    if (!isOpen) return null;

    return (
        <div className="modal-backdrop">
            <div className="modal">
                <h2>{message}</h2>
                <button onClick={onClose}>Close</button>
            </div>
        </div>
    );
};

const PaymentForm = ({ amount, initialEmail, title, description }) => {
    const stripe = useStripe();
    const elements = useElements();
    const [isLoading, setIsLoading] = useState(false);
    const [email, setEmail] = useState(initialEmail || '');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalMessage, setModalMessage] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        setIsLoading(true);

        if (!stripe || !elements) return;

        const cardElement = elements.getElement(CardElement);
        const amountInCents = amount * 100;

        try {
            const response = await fetch('https://shashikala-backend-v1.onrender.com/create-payment-intent', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ amount: amountInCents, email }),
            });

            const { clientSecret, error } = await response.json();

            if (error) {
                setModalMessage(`Transaction failed: ${error}`);
                setIsModalOpen(true);
                setIsLoading(false);
                return;
            }

            const { error: stripeError } = await stripe.confirmCardPayment(clientSecret, {
                payment_method: {
                    card: cardElement,
                    billing_details: { email },
                },
            });

            if (stripeError) {
                setModalMessage(`Transaction failed: ${stripeError.message}`);
            } else {
                setModalMessage('Payment successful! Check your email for confirmation.');
            }

            setIsModalOpen(true);
        } catch (error) {
            setModalMessage(`Transaction failed: ${error.message}`);
            setIsModalOpen(true);
        } finally {
            setIsLoading(false);
        }
    };

    const handleModalClose = () => {
        setIsModalOpen(false);
    };

    return (
        <>
            <div className="payment-form-container">
                {/* Title and Description based on event or donation */}
                <h2 className="payment-title">{title}</h2>
                <p className="payment-description">{description}</p>

                <form onSubmit={handleSubmit} className="payment-form">
                    <div className="input-group">
                        <label>Email</label>
                        <input
                            type="email"
                            placeholder="Email address"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)} // Allow user to change prepopulated email
                            required
                        />
                    </div>

                    <div className="input-group card-input-group">
                        <label>Card number</label>
                        <CardElement className="card-input" />
                    </div>

                    <button type="submit" disabled={!stripe || isLoading} className="submit-button">
                        {isLoading ? 'Processing...' : `Pay $${amount}`}
                    </button>
                </form>

                {/* Modal for showing transaction result */}
                <Modal isOpen={isModalOpen} onClose={handleModalClose} message={modalMessage} />
            </div>
            <Footer />
        </>
    );
};

const PaymentPage = () => {
    const location = useLocation();
    const paymentAmount = location.state?.paymentAmount || 0;
    const email = location.state?.email || '';

    // Extracting event details from location.state directly
    const eventName = location.state?.eventName || '';
    const eventDate = location.state?.eventDate || '';
    const eventVenue = location.state?.eventVenue || '';
    const eventTime = location.state?.eventTime || '';

    const isEvent = !!eventName; // Check if it's an event or a donation

    // Dynamic title and description based on event or donation
    const title = isEvent ? `Register for ${eventName}` : 'Donate to Our Organization';
    const description = isEvent
        ? `Date: ${eventDate} | Venue: ${eventVenue} | Time: ${eventTime}`
        : 'Your donation helps us continue our mission. Thank you for your generosity.';

    return (
        <Elements stripe={stripePromise}>
            <PaymentForm amount={paymentAmount} initialEmail={email} title={title} description={description} />
        </Elements>
    );
};

export default PaymentPage;
