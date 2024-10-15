import React, { useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import './RegistrationForm.css'; // Importing the CSS file
import Footer from './Footer.jsx';

const RegistrationForm = () => {
    const location = useLocation();

    // Extract data from location state
    const paymentAmount = location.state?.paymentAmount || 0;
    const eventName = location.state?.eventName || '';
    const eventDate = location.state?.eventDate || '';
    const eventVenue = location.state?.eventVenue || '';
    const eventTime = location.state?.eventTime || '';

    // State to capture the entered email
    const [email, setEmail] = useState('');

    return (
        <>
            <div className="form-container">
                <h1 className="event-name">{eventName}</h1>
                <p className="event-info">Date: {eventDate} | Time: {eventTime} | Location: {eventVenue}</p>
                <form className="form">
                    {/* Form fields */}
                    <div className="horizontal-group">
                        <div className="form-group">
                            <label>First Name*</label>
                            <input type="text" name="firstName" placeholder="First Name" required />
                        </div>
                        <div className="form-group">
                            <label>Middle Name (optional)</label>
                            <input type="text" name="middleName" placeholder="Middle Name" />
                        </div>
                        <div className="form-group">
                            <label>Last Name*</label>
                            <input type="text" name="lastName" placeholder="Last Name" required />
                        </div>
                    </div>

                    <div className="horizontal-group">
                        <div className="form-group">
                            <label>Email*</label>
                            <input
                                type="email"
                                name="email"
                                placeholder="abc@gmail.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)} // Capture the entered email
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label>Contact*</label>
                            <input type="text" name="contact" placeholder="+1 (000)-000-0000" required />
                        </div>
                    </div>

                    <div className="form-group">
                        <label>Address*</label>
                        <input type="text" name="address1" placeholder="Primary Address" required />
                        <input type="text" name="address2" placeholder="Apt/ Unit/ Suite" />
                    </div>

                    <div className="horizontal-group">
                        <div className="form-group">
                            <label>City*</label>
                            <input type="text" name="city" placeholder="City" required />
                        </div>
                        <div className="form-group">
                            <label>State*</label>
                            <input type="text" name="state" placeholder="State" required />
                        </div>
                        <div className="form-group">
                            <label>Zipcode*</label>
                            <input type="text" name="zipcode" placeholder="Zipcode" required />
                        </div>
                    </div>

                    {/* Display the payment amount */}
                    <p>Registration Fee: ${paymentAmount}</p>

                    {/* Pass event details, payment amount, and email to PaymentPage */}
                    <Link
                        to="/payment"
                        state={{
                            paymentAmount,
                            email,
                            eventName,
                            eventDate,
                            eventVenue,
                            eventTime
                        }}
                        className="submit-button"
                    >
                        Proceed to Payment
                    </Link>
                </form>
            </div>
            <Footer />
        </>
    );
};

export default RegistrationForm;
