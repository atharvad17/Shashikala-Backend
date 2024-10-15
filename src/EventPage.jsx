import React from 'react';
import './EventPage.css';
import { Link } from 'react-router-dom'; // Import Link
import Footer from './Footer.jsx';

const EventPage = () => {
    const paymentAmount = 20; // Fixed payment amount for the event
    const eventName = "Diwali Art Festival 2024";
    const eventDate = "October 25, 2024";
    const eventVenue = "Atlanta, GA";
    const eventTime = "7:00 PM EST";

    return (
        <>
            <div className="container">
                <div className="event-box">
                    <div className="event-page">
                        {/* Left Section: Event Details */}
                        <div className="event-details">
                            <h1>{eventName}</h1>
                            <p>Description of the event. Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>

                            {/* Event Info */}
                            <div className="event-info">
                                <h2>Event Details</h2>
                                <ul>
                                    <li>Event Name: {eventName}</li>
                                    <li>Location: {eventVenue}</li>
                                    <li>Date: {eventDate}</li>
                                    <li>Time: {eventTime}</li>
                                </ul>
                            </div>

                            {/* Event Inclusions */}
                            <div className="event-info">
                                <h2>Inclusions</h2>
                                <ul>
                                    <li>Snacks</li>
                                    <li>Workshop Materials</li>
                                </ul>
                            </div>

                            {/* Price */}
                            <div className="event-info">
                                <h2>Entry Fee</h2>
                                <ul>
                                    <li>${paymentAmount}</li> {/* Display payment amount */}
                                </ul>
                            </div>

                            {/* Pass payment amount and event details to RegistrationForm */}
                            <Link
                                to="/register"
                                state={{
                                    paymentAmount,
                                    eventName,
                                    eventDate,
                                    eventVenue,
                                    eventTime
                                }}
                                className="register-button">
                                Register
                            </Link>
                        </div>

                        {/* Right Section: Artist Info */}
                        <div className="artist-info">
                            <div className="eventImage"></div>
                            <h3>Main Artist Name</h3>
                            <p>Brief description of the artist.</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Place the Footer outside the container so it spans the entire width */}
            <Footer />
        </>
    );
};

export default EventPage;
