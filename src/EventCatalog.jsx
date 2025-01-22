import React from 'react';
import { Link } from 'react-router-dom';
import './EventCatalog.css';
import Footer from './Footer.jsx';
import image1 from './Images/homeScreen1.jpg'; // Import the image

const EventCatalog = () => {
    const events = [
        {
            id: 1,
            name: "Diwali Art Festival 2024",
            date: "October 25, 2024",
            location: "Atlanta, GA",
            price: 20,
            image: image1, // Use the imported image
        },
        {
            id: 2,
            name: "Thanksgiving Art Festival 2024",
            date: "November 5, 2024",
            location: "Atlanta, GA",
            price: 0,
            image: image1, // Use the imported image
        },
        {
            id: 3,
            name: "Christmas Art Festival 2024",
            date: "December 15, 2024",
            location: "Atlanta, GA",
            price: 30,
            image: image1, // Use the imported image
        },
    ];

    return (
        <>
            <div className="event-catalog-container">
                <div className="event-catalog-header">
                    <h1>Upcoming Events</h1>
                </div>
                <div className="event-grid">
                    {events.map(event => (
                        <div className="event-card" key={event.id}>
                            <div
                                className="eventImage"
                                style={{ backgroundImage: `url(${event.image})` }}
                            ></div>
                            <h3>{event.name}</h3>
                            <p>Date: {event.date}</p>
                            <p>Location: {event.location}</p>
                            <p>Price: ${event.price}</p>
                            <div className="buttonContainer">
                                <Link to={`/event/${event.id}`} className="learnMoreButton">
                                    Learn More
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <Footer />
        </>
    );
};

export default EventCatalog;


{/*
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './EventCatalog.css';
import Footer from './Footer.jsx';

const EventCatalog = () => {
    const [events, setEvents] = useState([]); // State to hold fetched events
    const [loading, setLoading] = useState(true); // State for loading indicator
    const [error, setError] = useState(null); // State for error handling

    // Function to fetch events from the API
    const fetchEvents = async () => {
        try {
            const response = await fetch('/api/events/upcoming'); // Replace with your actual API endpoint
            if (!response.ok) {
                throw new Error(`Error: ${response.statusText}`);
            }
            const data = await response.json();
            setEvents(data); // Update state with fetched events
        } catch (err) {
            setError(err.message); // Handle errors
        } finally {
            setLoading(false); // Set loading to false after fetch
        }
    };

    // Fetch events when the component loads
    useEffect(() => {
        fetchEvents();
    }, []);

    return (
        <>
            <div className="event-catalog-container">
                <div className="event-catalog-header">
                    <h1>Upcoming Events</h1>
                </div>

                {loading ? (
                    <p>Loading events...</p>
                ) : error ? (
                    <p className="error-message">Failed to load events: {error}</p>
                ) : events.length > 0 ? (
                    <div className="event-grid">
                        {events.map(event => (
                            <div className="event-card" key={event.id}>
                                <div
                                    className="eventImage"
                                    style={{ backgroundImage: `url(${event.image || 'default-image.jpg'})` }}
                                ></div>
                                <h3>{event.name}</h3>
                                <p>Date: {event.date}</p>
                                <p>Location: {event.location}</p>
                                <p>Price: ${event.price}</p>
                                <div className="buttonContainer">
                                    <Link to={`/event/${event.id}`} className="learnMoreButton">
                                        Learn More
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p>No upcoming events available.</p>
                )}
            </div>
            <Footer />
        </>
    );
};

export default EventCatalog;

*/}