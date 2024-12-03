import React from 'react';
import { useNavigate } from 'react-router-dom';
import './SubscriptionPage.css';
import Footer from './Footer.jsx';

const SubscriptionPage = () => {
    const navigate = useNavigate();

    const handleProceedToPay = (amount) => {
        navigate('/payment', { state: { paymentAmount: amount } });
    };

    return (
        <>
            <div className="subscription-page">
                <h1>Choose Your Subscription Plan</h1>
                <div className="subscription-models">
                    <div className="subscription-card free">
                        <div className="card-header">Free Plan</div>
                        <div className="card-body">
                            <p className="price">Free</p>
                            <ul>
                                <li>Access to public gallery</li>
                                <li>Browse featured artists</li>
                                <li>Email updates</li>
                            </ul>
                        </div>
                        <div className="card-footer">
                            <button
                                className="subscribe-button free-button"
                                onClick={() => handleProceedToPay(0)}
                            >
                                Start Free
                            </button>
                        </div>
                    </div>
                    <div className="subscription-card bronze">
                        <div className="card-header">Bronze Plan</div>
                        <div className="card-body">
                            <p className="price">$10/month</p>
                            <ul>
                                <li>Access to basic features</li>
                                <li>Upload up to 5 artworks</li>
                                <li>Email support</li>
                            </ul>
                        </div>
                        <div className="card-footer">
                            <button
                                className="subscribe-button"
                                onClick={() => handleProceedToPay(10)}
                            >
                                Proceed to Pay
                            </button>
                        </div>
                    </div>
                    <div className="subscription-card silver">
                        <div className="card-header">Silver Plan</div>
                        <div className="card-body">
                            <p className="price">$30/month</p>
                            <ul>
                                <li>Access to all features</li>
                                <li>Upload up to 20 artworks</li>
                                <li>Priority email support</li>
                            </ul>
                        </div>
                        <div className="card-footer">
                            <button
                                className="subscribe-button"
                                onClick={() => handleProceedToPay(30)}
                            >
                                Proceed to Pay
                            </button>
                        </div>
                    </div>
                    <div className="subscription-card gold">
                        <div className="card-header">Gold Plan</div>
                        <div className="card-body">
                            <p className="price">$60/month</p>
                            <ul>
                                <li>Unlimited uploads</li>
                                <li>Personalized recommendations</li>
                                <li>Dedicated account manager</li>
                            </ul>
                        </div>
                        <div className="card-footer">
                            <button
                                className="subscribe-button"
                                onClick={() => handleProceedToPay(60)}
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
