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
