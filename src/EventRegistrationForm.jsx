import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './EventRegistrationForm.css';
import Footer from './Footer.jsx';

const EventRegistrationForm = () => {
    const location = useLocation();
    const navigate = useNavigate();

    // Extract data from location state
    const eventId = location.state?.eventId || 1;
    const paymentAmount = location.state?.paymentAmount || 0;
    const eventName = location.state?.eventName || '';
    const eventDate = location.state?.eventDate || '';
    const eventVenue = location.state?.eventVenue || '';
    const eventTime = location.state?.eventTime || '';

    // Form state
    const [firstName, setFirstName] = useState('');
    const [middleName, setMiddleName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [contact, setContact] = useState('');
    const [address1, setAddress1] = useState('');
    const [address2, setAddress2] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [zipcode, setZipcode] = useState('');
    const [isRegistered, setIsRegistered] = useState(false);
    const [errors, setErrors] = useState({});
    const [isLoading, setIsLoading] = useState(false);

    const validateFields = () => {
        const newErrors = {};
        if (!firstName.trim()) newErrors.firstName = 'First name is required';
        if (!lastName.trim()) newErrors.lastName = 'Last name is required';
        if (!email.trim() || !/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) newErrors.email = 'Valid email is required';
        if (!contact.trim() || !/^\+?[0-9]{1,3}?[-.●]?\(?(?:\d{1,4})\)?[-.●]?\d{1,4}[-.●]?\d{1,9}$/.test(contact))
            newErrors.contact = 'Valid contact number is required';
        if (!address1.trim()) newErrors.address1 = 'Address is required';
        if (!city.trim()) newErrors.city = 'City is required';
        if (!state.trim()) newErrors.state = 'State is required';
        if (!zipcode.trim()) newErrors.zipcode = 'Zipcode is required';

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleRegister = async () => {
        if (validateFields()) {
            setIsLoading(true);
            try {
                const registrationData = {
                    eventId,
                    eventName,
                    eventDate,
                    eventVenue,
                    eventTime,
                    firstName,
                    middleName,
                    lastName,
                    email,
                    contact,
                    address1,
                    address2,
                    city,
                    state,
                    zipcode,
                    paymentAmount
                };

                console.log('Sending registration data:', registrationData);

                const response = await fetch('https://shashikala-backend-gddy.onrender.com/api/event-registration', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    },
                    body: JSON.stringify(registrationData)
                });

                if (!response.ok) {
                    const errorText = await response.text();
                    console.error('Server response:', errorText);
                    throw new Error(`Server responded with status ${response.status}`);
                }

                const result = await response.json();
                console.log('Registration response:', result);

                if (!result.success) {
                    throw new Error(result.message);
                }

                if (paymentAmount === 0) {
                    setIsRegistered(true);
                } else {
                    navigate('/payment', {
                        state: {
                            paymentAmount,
                            email,
                            fullName: `${firstName} ${lastName}`,
                            address1,
                            address2,
                            city,
                            state,
                            eventName,
                            eventDate,
                            eventVenue,
                            eventTime,
                            registrationId: result.registration.registration_id,
                            clientSecret: result.clientSecret,
                            zipcode
                        }
                    });
                }
            } catch (error) {
                console.error('Registration error:', error);
                alert('Registration failed: ' + error.message);
            } finally {
                setIsLoading(false);
            }
        }
    };

    const handleCloseDialog = () => {
        setFirstName('');
        setMiddleName('');
        setLastName('');
        setEmail('');
        setContact('');
        setAddress1('');
        setAddress2('');
        setCity('');
        setState('');
        setZipcode('');
        setIsRegistered(false);
        navigate('/');
    };

    return (
        <>
            <div className="form-container">
                <h1 className="event-name">{eventName}</h1>
                <p className="event-info">Date: {eventDate} | Time: {eventTime} | Location: {eventVenue}</p>
                <form className="form" onSubmit={(e) => e.preventDefault()}>
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
                            {errors.firstName && <p className="error">{errors.firstName}</p>}
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
                            {errors.lastName && <p className="error">{errors.lastName}</p>}
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
                            {errors.email && <p className="error">{errors.email}</p>}
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
                            {errors.contact && <p className="error">{errors.contact}</p>}
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
                        {errors.address1 && <p className="error">{errors.address1}</p>}
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
                            {errors.city && <p className="error">{errors.city}</p>}
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
                            {errors.state && <p className="error">{errors.state}</p>}
                        </div>
                        <div className="form-group">
                            <label>Zipcode*</label>
                            <input
                                type="text"
                                name="zipcode"
                                placeholder="Zipcode"
                                value={zipcode}
                                onChange={(e) => setZipcode(e.target.value)}
                                required
                            />
                            {errors.zipcode && <p className="error">{errors.zipcode}</p>}
                        </div>
                    </div>

                    <p>Registration Fee: ${paymentAmount}</p>

                    <button
                        type="button"
                        onClick={handleRegister}
                        className="submit-button"
                        disabled={isLoading}
                    >
                        {isLoading ? 'Processing...' : (paymentAmount > 0 ? 'Proceed to Payment' : 'Register')}
                    </button>
                </form>

                {isRegistered && (
                    <div className="dialog">
                        <p>Thank you for registering! A confirmation email has been sent.</p>
                        <button onClick={handleCloseDialog} className="close-button">Close</button>
                    </div>
                )}
            </div>
            <Footer />
        </>
    );
};

export default EventRegistrationForm;






{/* }
import React, { useState } from 'react';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import './EventRegistrationForm.css'; // Importing the CSS file
import Footer from './Footer.jsx';

const EventEventRegistrationForm = () => {
    const location = useLocation();
    const navigate = useNavigate(); // For navigation after registration/payment

    // Extract data from location state
    const paymentAmount = location.state?.paymentAmount || 0;
    const eventName = location.state?.eventName || '';
    const eventDate = location.state?.eventDate || '';
    const eventVenue = location.state?.eventVenue || '';
    const eventTime = location.state?.eventTime || '';

    // State to capture form values
    const [firstName, setFirstName] = useState('');
    const [middleName, setMiddleName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [contact, setContact] = useState('');
    const [address1, setAddress1] = useState('');
    const [address2, setAddress2] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [zipcode, setZipcode] = useState('');

    // State for showing the success dialog box
    const [isRegistered, setIsRegistered] = useState(false);

    // Validation error state
    const [errors, setErrors] = useState({});

    // Function to validate fields
    const validateFields = () => {
        const newErrors = {};

        if (!firstName.trim()) newErrors.firstName = 'First name is required';
        if (!lastName.trim()) newErrors.lastName = 'Last name is required';
        if (!email.trim() || !/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) newErrors.email = 'Valid email is required';
        if (!contact.trim() || !/^\+?[0-9]{1,3}?[-.●]?\(?(?:\d{1,4})\)?[-.●]?\d{1,4}[-.●]?\d{1,9}$/.test(contact))
            newErrors.contact = 'Valid contact number is required';
        if (!address1.trim()) newErrors.address1 = 'Address is required';
        if (!city.trim()) newErrors.city = 'City is required';
        if (!state.trim()) newErrors.state = 'State is required';
        if (!zipcode.trim()) newErrors.zipcode = 'Zipcode is required';

        setErrors(newErrors);

        // Return true if no errors
        return Object.keys(newErrors).length === 0;
    };

    // Function to handle free event registration
    const handleRegister = () => {
        if (validateFields()) {
            setIsRegistered(true);
        }
    };

    // Function to close the success dialog box and navigate to home
    const handleCloseDialog = () => {
        // Clear all fields
        setFirstName('');
        setMiddleName('');
        setLastName('');
        setEmail('');
        setContact('');
        setAddress1('');
        setAddress2('');
        setCity('');
        setState('');
        setZipcode('');

        // Close the dialog and navigate to home
        setIsRegistered(false);
        navigate('/');
    };

    return (
        <>
            <div className="form-container">
                <h1 className="event-name">{eventName}</h1>
                <p className="event-info">Date: {eventDate} | Time: {eventTime} | Location: {eventVenue}</p>
                <form className="form">
                    {/* Form fields 
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
                            {errors.firstName && <p className="error">{errors.firstName}</p>}
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
                            {errors.lastName && <p className="error">{errors.lastName}</p>}
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
                            {errors.email && <p className="error">{errors.email}</p>}
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
                            {errors.contact && <p className="error">{errors.contact}</p>}
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
                        {errors.address1 && <p className="error">{errors.address1}</p>}
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
                            {errors.city && <p className="error">{errors.city}</p>}
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
                            {errors.state && <p className="error">{errors.state}</p>}
                        </div>
                        <div className="form-group">
                            <label>Zipcode*</label>
                            <input
                                type="text"
                                name="zipcode"
                                placeholder="Zipcode"
                                value={zipcode}
                                onChange={(e) => setZipcode(e.target.value)}
                                required
                            />
                            {errors.zipcode && <p className="error">{errors.zipcode}</p>}
                        </div>
                    </div>

                    {/* Display the payment amount 
                    <p>Registration Fee: ${paymentAmount}</p>

                    {/* Conditionally render either the payment or register button 
                    {paymentAmount > 0 ? (
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
                            onClick={(e) => {
                                if (!validateFields()) e.preventDefault();
                            }}
                        >
                            Proceed to Payment
                        </Link>
                    ) : (
                        <button type="button" onClick={handleRegister} className="submit-button">
                            Register
                        </button>
                    )}
                </form>
            </div>

            {/* Dialog Box for Successful Registration 
            {isRegistered && (
                <div className="dialog-backdrop">
                    <div className="dialog-box">
                        <h2>Registration Successful!</h2>
                        <p>You have successfully registered for {eventName}.</p>
                        <button onClick={handleCloseDialog}>Close</button>
                    </div>
                </div>
            )}

            <Footer />
        </>
    );
};

export default EventEventRegistrationForm;
*/}