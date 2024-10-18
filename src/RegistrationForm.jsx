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
    const [firstName, setFirstName] = useState('');
    const [middleName, setMiddleName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [contact, setContact] = useState('');
    const [address1, setAddress1] = useState('');
    const [address2, setAddress2] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');


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
                            <input
                                type="text"
                                name="firstName"
                                placeholder="First Name"
                                value={firstName}
                                onChange={(e) => setFirstName(e.target.value)}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label>Middle Name (optional)</label>
                            <input
                                type="text"
                                name="middleName"
                                placeholder="Middle Name"
                                value={middleName}
                                onChange={(e) => setMiddleName(e.target.value)}
                            />
                        </div>
                        <div className="form-group">
                            <label>Last Name*</label>
                            <input
                                type="text"
                                name="lastName"
                                placeholder="Last Name"
                                value={lastName}
                                onChange={(e) => setLastName(e.target.value)}
                                required
                            />
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
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label>Contact*</label>
                            <input
                                type="text"
                                name="contact"
                                placeholder="+1 (000)-000-0000"
                                value={contact}
                                onChange={(e) => setContact(e.target.value)}
                                required
                            />
                        </div>
                    </div>

                    <div className="form-group">
                        <label>Address*</label>
                        <input
                            type="text"
                            name="address1"
                            placeholder="Primary Address"
                            value={address1}
                            onChange={(e) => setAddress1(e.target.value)}
                            required
                        />
                        <input
                            type="text"
                            name="address2"
                            placeholder="Apt/ Unit/ Suite"
                            value={address2}
                            onChange={(e) => setAddress2(e.target.value)}
                        />
                    </div>

                    <div className="horizontal-group">
                        <div className="form-group">
                            <label>City*</label>
                            <input
                                type="text"
                                name="city"
                                placeholder="City"
                                value={city}
                                onChange={(e) => setCity(e.target.value)}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label>State*</label>
                            <input
                                type="text"
                                name="state"
                                placeholder="State"
                                value={state}
                                onChange={(e) => setState(e.target.value)}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label>Zipcode*</label>
                            <input type="text" name="zipcode" placeholder="Zipcode" required />
                        </div>
                    </div> {/* <-- This was missing */}

                    {/* Display the payment amount */}
                    <p>Registration Fee: ${paymentAmount}</p>

                    {/* Pass event details, payment amount, and email to PaymentPage */}
                    <Link
                        to="/payment"
                        state={{
                            paymentAmount,
                            email,
                            firstName,
                            middleName,
                            lastName,
                            address1,
                            address2,
                            city,
                            state,
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
