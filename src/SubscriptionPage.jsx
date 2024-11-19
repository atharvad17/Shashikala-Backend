import React from 'react';
import { useNavigate } from 'react-router-dom';
import './SubscriptionPage.css';
import Footer from './Footer';

const SubscriptionPage = () => {
    const navigate = useNavigate();

    const handleProceedToPay = (amount) => {
        navigate('/payment', { state: { paymentAmount: amount } });
    };

    return (
        <>
        <div className="subscription-page">
            <h1>Choose Your Subscription</h1>
            <div className="subscription-models">
                <div className="subscription-card">
                    <div className="card-header">
                        <h2>Basic Plan</h2>
                    </div>
                    <div className="card-body">
                        <p className="price">$20/month</p>
                        <ul>
                            <li>Access to basic features</li>
                            <li>Upload up to 10 artworks</li>
                            <li>Email support</li>
                        </ul>
                    </div>
                    <div className="card-footer">
                        <button
                            className="subscribe-button"
                            onClick={() => handleProceedToPay(20)}
                        >
                            Proceed to Pay
                        </button>
                    </div>
                </div>
                <div className="subscription-card premium">
                    <div className="card-header">
                        <h2>Premium Plan</h2>
                    </div>
                    <div className="card-body">
                        <p className="price">$50/month</p>
                        <ul>
                            <li>Access to all features</li>
                            <li>Unlimited artwork uploads</li>
                            <li>Priority support</li>
                            <li>Personalized recommendations</li>
                        </ul>
                    </div>
                    <div className="card-footer">
                        <button
                            className="subscribe-button"
                            onClick={() => handleProceedToPay(50)}
                        >
                            Proceed to Pay
                        </button>
                    </div>
                </div>
            </div>
            </div>
            <Footer />
        </>
    );
};

export default SubscriptionPage;
