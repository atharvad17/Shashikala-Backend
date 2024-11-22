import React, { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import './PaymentPage.css';
import { useLocation, useNavigate } from 'react-router-dom';
import Footer from './Footer';

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

const PaymentForm = ({ amount, initialEmail, initialDetails, title, description }) => {
    const stripe = useStripe();
    const elements = useElements();
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [email, setEmail] = useState(initialEmail || '');
    const [fullName, setFullName] = useState(
        `${initialDetails.firstName || ''} ${initialDetails.middleName || ''} ${initialDetails.lastName || ''}`.trim()
    );
    const [address1, setAddress1] = useState(initialDetails.address1 || '');
    const [address2, setAddress2] = useState(initialDetails.address2 || '');
    const [city, setCity] = useState(initialDetails.city || '');
    const [state, setState] = useState(initialDetails.state || '');
    const [zipcode, setZipcode] = useState(initialDetails.zipcode || '');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalMessage, setModalMessage] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        setIsLoading(true);

        if (!stripe || !elements) return;

        const cardElement = elements.getElement(CardElement);
        const amountInCents = amount * 100;

        try {
            const response = await fetch('https://shashikala-backend-gddy.onrender.com/create-payment-intent', {
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
                    billing_details: { email, name: fullName, address: { line1: address1, line2: address2, city, state, postal_code: zipcode } },
                },
            });

            if (stripeError) {
                setModalMessage(`Transaction failed: ${stripeError.message}`);
            } else {
                setModalMessage('Payment successful! Check your email for confirmation.');
                // Clear fields after successful payment
                setFullName('');
                setEmail('');
                setAddress1('');
                setAddress2('');
                setCity('');
                setState('');
                setZipcode('');
                // Redirect to home after showing modal
                setTimeout(() => {
                    navigate('/');
                }, 2000);
            }

            setIsModalOpen(true);
        } catch (error) {
            setModalMessage(`Transaction failed: ${error.message}`);
            setIsModalOpen(true);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            <div className="payment-form-container">
                <h2 className="payment-title">{title}</h2>
                <p className="payment-description">{description}</p>

                <form onSubmit={handleSubmit} className="payment-form">
                    {/* Name fields */}
                    <div className="input-group">
                        <label>Name on Card</label>
                        <input
                            type="text"
                            placeholder="Name on Card"
                            value={fullName}
                            onChange={(e) => setFullName(e.target.value)}
                            required
                        />
                    </div>

                    {/* Address fields */}
                    <div className="input-group">
                        <label>Address</label>
                        <input
                            type="text"
                            placeholder="Address 1"
                            value={address1}
                            onChange={(e) => setAddress1(e.target.value)}
                        />
                        <input
                            type="text"
                            placeholder="Address 2"
                            value={address2}
                            onChange={(e) => setAddress2(e.target.value)}
                        />
                    </div>
                    <div className="input-group">
                        <label>City</label>
                        <input
                            type="text"
                            placeholder="City"
                            value={city}
                            onChange={(e) => setCity(e.target.value)}
                        />
                    </div>
                    <div className="input-group">
                        <label>State</label>
                        <input
                            type="text"
                            placeholder="State"
                            value={state}
                            onChange={(e) => setState(e.target.value)}
                        />
                    </div>
                    <div className="input-group">
                        <label>Zipcode</label>
                        <input
                            type="text"
                            placeholder="Zipcode"
                            value={zipcode}
                            onChange={(e) => setZipcode(e.target.value)}
                        />
                    </div>

                    {/* Email field */}
                    <div className="input-group">
                        <label>Email</label>
                        <input
                            type="email"
                            placeholder="Email address"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>

                    {/* Card payment */}
                    <div className="input-group card-input-group">
                        <label>Card number</label>
                        <CardElement className="card-input" />
                    </div>

                    <button type="submit" disabled={!stripe || isLoading} className="submit-button">
                        {isLoading ? 'Processing...' : `Pay $${amount}`}
                    </button>
                </form>

                <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} message={modalMessage} />
            </div>
            <Footer />
        </>
    );
};

const PaymentPage = () => {
    const location = useLocation();
    const paymentAmount = location.state?.totalAmount || location.state?.paymentAmount || 0;
    const email = location.state?.email || '';
    const firstName = location.state?.firstName || '';
    const middleName = location.state?.middleName || '';
    const lastName = location.state?.lastName || '';
    const address1 = location.state?.address1 || '';
    const address2 = location.state?.address2 || '';
    const city = location.state?.city || '';
    const state = location.state?.state || '';
    const zipcode = location.state?.zipcode || '';
    const cartItems = location.state?.cartItems || [];

    const isEvent = !!location.state?.eventName;
    const isShopping = cartItems.length > 0;

    const title = isEvent
        ? `Register for ${location.state.eventName}`
        : isShopping
            ? 'Complete Your Purchase'
            : 'Donate to Our Organization';

    const description = isEvent
        ? `Date: ${location.state.eventDate} | Venue: ${location.state.eventVenue} | Time: ${location.state.eventTime}`
        : isShopping
            ? `Thank You for purchasing the following items:\n${cartItems
                .map((item) => `${item.name} x ${item.quantity}`)
                .join(', ')}`
            : 'Your donation helps us continue our mission. Thank you for your generosity.';

    const initialDetails = {
        firstName,
        middleName,
        lastName,
        address1,
        address2,
        city,
        state,
        zipcode,
    };

    return (
        <Elements stripe={stripePromise}>
            <PaymentForm
                amount={paymentAmount}
                initialEmail={email}
                initialDetails={initialDetails}
                title={title}
                description={description}
            />
        </Elements>
    );
};

export default PaymentPage;
