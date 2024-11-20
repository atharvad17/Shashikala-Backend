import React from 'react';
import { useParams, Link } from 'react-router-dom';
import './EventPage.css';
import Footer from './Footer.jsx';
import image1 from './Images/homeScreen1.jpg';

const eventsData = [
    {
        id: 1,
        name: "Diwali Art Festival 2024",
        date: "October 25, 2024",
        location: "Atlanta, GA",
        time: "7:00 PM EST",
        price: 20,
        description: "Celebrate Diwali with art exhibitions and workshops. Experience the fusion of culture and creativity.",
        inclusions: ["Snacks", "Workshop Materials"],
        artist: {
            name: "Main Artist Name",
            bio: "Brief description of the artist."
        },
        image: image1,
    },
    {
        id: 2,
        name: "Thanksgiving Art Festival 2024",
        date: "November 5, 2024",
        location: "Atlanta, GA",
        time: "7:00 PM EST",
        price: 0,
        description: "Celebrate Thanksgiving with art exhibitions and workshops. Experience the fusion of culture and creativity.",
        inclusions: ["Snacks", "Workshop Materials"],
        artist: {
            name: "Main Artist Name",
            bio: "Brief description of the artist."
        },
        image: image1,
    },
];

const EventPage = () => {
    const { id } = useParams();
    const event = eventsData.find((e) => e.id === parseInt(id));

    if (!event) {
        return <h1>Event not found</h1>;
    }

    return (
        <>
            <div className="container">
                <div className="event-box">
                    <div className="event-page">
                        <div className="event-details">
                            <h1>{event.name}</h1>
                            <p>{event.description}</p>

                            <div className="event-info">
                                <h2>Event Details</h2>
                                <ul>
                                    <li>Location: {event.location}</li>
                                    <li>Date: {event.date}</li>
                                    <li>Time: {event.time}</li>
                                </ul>
                            </div>

                            <div className="event-info">
                                <h2>Inclusions</h2>
                                <ul>
                                    {event.inclusions.map((item, index) => (
                                        <li key={index}>{item}</li>
                                    ))}
                                </ul>
                            </div>

                            <div className="event-info">
                                <h2>Entry Fee</h2>
                                <ul>
                                    <li>${event.price}</li>
                                </ul>
                            </div>

                            <Link
                                to="/register"
                                state={{
                                    eventId: event.id,
                                    paymentAmount: event.price,
                                    eventName: event.name,
                                    eventDate: event.date,
                                    eventVenue: event.location,
                                    eventTime: event.time
                                }}
                                className="register-button"
                            >
                                Register
                            </Link>
                        </div>

                        <div className="artist-info">
                            <div className="eventImage" style={{ backgroundImage: `url(${event.image})` }}></div>
                            <h3>{event.artist.name}</h3>
                            <p>{event.artist.bio}</p>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default EventPage;
