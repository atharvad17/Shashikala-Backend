import React, { useState, useEffect } from 'react';
import './ArtistProfilePage.css';
import placeholderImage from './Images/homeScreen1.jpg';
import Footer from './Footer.jsx';
import { FaTrash, FaChevronDown, FaChevronUp, FaPen } from 'react-icons/fa';
import ArtworkEditModal from './ArtworkEditModal';
import ArtistEventDialog from './ArtistEventDialog';
import { useNavigate } from 'react-router-dom';
//import axios from "axios";


const ArtistProfilePage = () => {
    const navigate = useNavigate();
    const [selectedOption, setSelectedOption] = useState('My Art');
    const [profileImage, setProfileImage] = useState(placeholderImage);
    const [profileImageTemp, setProfileImageTemp] = useState(placeholderImage);
    const [artistName, setArtistName] = useState('John Doe');
    const [displayName, setDisplayName] = useState('John Doe');
    const [address, setAddress] = useState('123 Artist Street');
    const [emailAddress, setEmailAddress] = useState('abc@gmail.com');
    const [contactInfo, setContactInfo] = useState('1234567890');
    const [currentSubscription, setCurrentSubscription] = useState('Premium');
    const [publicLink, setPublicLink] = useState("");
    const [artistBio, setArtistBio] = useState('asdasdasdasdasdasdasdasdasdasd');
    const [popupMessage, setPopupMessage] = useState('');
    const [isSidebarVisible, setIsSidebarVisible] = useState(true);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
    const [catalogs, setCatalogs] = useState([
        {
            name: 'Catalog 1',
            items: [
                { title: 'Art Piece 1A', imageUrl: placeholderImage, price: 100 },
                { title: 'Art Piece 1B', imageUrl: placeholderImage, price: 150 },
                { title: 'Art Piece 1C', imageUrl: placeholderImage, price: 200 },
            ],
            expanded: false,
        },
        {
            name: 'Catalog 2',
            items: [
                { title: 'Art Piece 2A', imageUrl: placeholderImage, price: 120 },
                { title: 'Art Piece 2B', imageUrl: placeholderImage, price: 180 },
                { title: 'Art Piece 2C', imageUrl: placeholderImage, price: 220 },
            ],
            expanded: false,
        },
        {
            name: 'Catalog 3',
            items: [
                { title: 'Art Piece 3A', imageUrl: placeholderImage, price: 100 },
                { title: 'Art Piece 3B', imageUrl: placeholderImage, price: 150 },
                { title: 'Art Piece 3C', imageUrl: placeholderImage, price: 200 },
            ],
            expanded: false,
        },
        {
            name: 'Catalog 4',
            items: [
                { title: 'Art Piece 4A', imageUrl: placeholderImage, price: 50 },
                { title: 'Art Piece 4B', imageUrl: placeholderImage, price: 75 },
                { title: 'Art Piece 4C', imageUrl: placeholderImage, price: 100 },
            ],
            expanded: false,
        },
    ]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentArtwork, setCurrentArtwork] = useState(null);
    const [currentCatalogIndex, setCurrentCatalogIndex] = useState(null);
    const [currentItemIndex, setCurrentItemIndex] = useState(null);
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);

    const [upcomingEvents, setUpcomingEvents] = useState([
        { title: 'Art Exhibition', date: '2024-12-20', location: 'Gallery A', time: '18:00', price: '10.00' },
    ]);
    const [pastEvents, setPastEvents] = useState([
        { title: 'Music Concert', date: '2024-11-01', location: 'Concert Hall', time: '20:00', price: '25.00' },
    ]);

    const [isEventDialogOpen, setIsEventDialogOpen] = useState(false);
    const [currentEvent, setCurrentEvent] = useState(null);
    const [dialogMode, setDialogMode] = useState('create'); // 'create' or 'edit'
    const [currentEventIndex, setCurrentEventIndex] = useState(null);

    const [showSubscriptionPlans, setShowSubscriptionPlans] = useState(false);
    const [selectedPlan, setSelectedPlan] = useState(null);
    const [currentPlan, setCurrentPlan] = useState("Bronze Plan"); // Initial current plan
    const [bankName, setBankName] = useState("");
    const [accountNumber, setAccountNumber] = useState("");
    const [routingNumber, setRoutingNumber] = useState("");
    const [accountHolderName, setAccountHolderName] = useState("");
    const subscriptionPlans = [
        {
            name: 'Free Plan',
            price: 'Free',
            benefits: [
                'Access to public gallery',
                'Limited storage (500MB)',
                'Basic analytics',
            ],
        },
        {
            name: 'Bronze Plan',
            price: '$10/month',
            benefits: [
                'Upload up to 5 artworks',
                'Standard analytics',
                'Priority email support',
            ],
        },
        {
            name: 'Silver Plan',
            price: '$30/month',
            benefits: [
                'Upload up to 20 artworks',
                'Enhanced analytics',
                'Dedicated account manager',
            ],
        },
        {
            name: 'Gold Plan',
            price: '$60/month',
            benefits: [
                'Unlimited uploads',
                'Advanced analytics dashboard',
                '24/7 priority support',
                'Exclusive marketing tools',
            ],
        },
    ];

    const [socialLinks, setSocialLinks] = useState({
        instagram: '',
        facebook: '',
        linkedin: '',
    });

    const handleSocialChange = (platform, value) => {
        setSocialLinks((prev) => ({ ...prev, [platform]: value }));
    };

    useEffect(() => {
        if (artistName) {
            const formattedName = artistName.toLowerCase().replace(/\s+/g, '-');
            setPublicLink(`www.shashikala-foundation.com/${formattedName}`);
        } else {
            setPublicLink("");
        }
    }, [artistName]);

    const handlePlanChange = (selectedPlan) => {
        setLoading(true);
        try {
            setCurrentPlan(selectedPlan);
            setPopupMessage(`Your plan has been switched to ${newPlan}. It will be activated starting next month.`);
            setTimeout(() => {
                setPopupMessage('');
            }, 4000);
        } catch (error) {
            console.error(error);
            setPopupMessage("Failed to update subscription.");
        } finally {
            setLoading(false);
        }
    };

    const handleEditClick = (artwork) => {
        setSelectedArtwork(artwork);
        setModalOpen(true);
    };

    const handleModalClose = (updatedArtwork) => {
        setModalOpen(false);
        if (updatedArtwork) {
            onArtworkUpdate(updatedArtwork); // Trigger update in parent component
        }
    };

    const toggleCatalog = (index) => {
        setCatalogs((prev) =>
            prev.map((catalog, i) =>
                i === index ? { ...catalog, expanded: !catalog.expanded } : catalog
            )
        );
    };

    const handleAddItem = (index) => {
        const newItem = {
            title: `New Art Piece ${catalogs[index].items.length + 1}`,
            image: placeholderImage,
            price: 0, // Default price
        };
        setCatalogs((prev) =>
            prev.map((catalog, i) =>
                i === index ? { ...catalog, items: [...catalog.items, newItem] } : catalog
            )
        );
        setSelectedItem({ ...newItem, catalogIndex: index, itemIndex: null });
        setModalOpen(true);
    };

    {/* 
    const handleAddItem = async (index) => {
        const newItem = {
            title: `New Art Piece ${catalogs[index].items.length + 1}`,
            imageUrl: placeholderImage,
            price: 0, // Default price
        };

        try {
            const response = await fetch("https://placeholderapi.com/api/artwork", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(newItem),
            });

            if (!response.ok) {
                throw new Error("Failed to add artwork.");
            }

            const addedItem = await response.json();
            setCatalogs((prev) =>
                prev.map((catalog, i) =>
                    i === index ? { ...catalog, items: [...catalog.items, addedItem] } : catalog
                )
            );
            setMessage("Artwork added successfully!");
        } catch (error) {
            setMessage(error.message || "Error: Failed to add artwork.");
        }
    };
    */}

    const handleEditItem = (catalogIndex, itemIndex) => {
        const itemToEdit = catalogs[catalogIndex].items[itemIndex];
        setSelectedItem({ ...itemToEdit, catalogIndex, itemIndex });
        setModalOpen(true);
    };


    const handleDeleteItem = (catalogIndex, itemIndex) => {
        setCatalogs((prev) =>
            prev.map((catalog, i) =>
                i === catalogIndex
                    ? {
                        ...catalog,
                        items: catalog.items.filter((_, j) => j !== itemIndex),
                    }
                    : catalog
            )
        );
    };

    {/* 
    const handleDeleteItem = async (catalogIndex, itemIndex) => {
    const itemId = catalogs[catalogIndex].items[itemIndex].id;

    try {
        const response = await fetch(
            `https://placeholderapi.com/api/artwork/${itemId}`,
            { method: "DELETE" }
        );

        if (!response.ok) {
            throw new Error("Failed to delete artwork.");
        }

        setCatalogs((prev) =>
            prev.map((catalog, i) =>
                i === catalogIndex
                    ? {
                        ...catalog,
                        items: catalog.items.filter((_, j) => j !== itemIndex),
                    }
                    : catalog
            )
        );
        setMessage("Artwork deleted successfully!");
    } catch (error) {
        setMessage(error.message || "Error: Failed to delete artwork.");
    }
    };
    */}

    const handleDeleteCatalog = (index) => {
        const updatedCatalogs = catalogs.filter((_, i) => i !== index);
        setCatalogs(updatedCatalogs);
    };

    const openModal = (catalogIndex, itemIndex = null) => {
        setCurrentCatalogIndex(catalogIndex);
        setCurrentItemIndex(itemIndex);

        const artwork =
            itemIndex !== null
                ? catalogs[catalogIndex].items[itemIndex]
                : { title: '', description: '', price: '', imageUrl: '', type: '', customFields: [] };

        setCurrentArtwork(artwork);
        setIsModalOpen(true);
    };


    const closeModal = () => {
        setIsModalOpen(false);
        setCurrentArtwork(null);
        setCurrentCatalogIndex(null);
        setCurrentItemIndex(null);
    };

    const saveArtwork = (updatedArtwork) => {
        setCatalogs((prev) =>
            prev.map((catalog, i) =>
                i === currentCatalogIndex
                    ? {
                        ...catalog,
                        items:
                            currentItemIndex !== null
                                ? catalog.items.map((item, j) =>
                                    j === currentItemIndex ? updatedArtwork : item
                                )
                                : [...catalog.items, updatedArtwork],
                    }
                    : catalog
            )
        );
        closeModal();
    };

    {/*
    const saveArtwork = async (updatedArtwork) => {
    const { catalogIndex, itemIndex, ...artworkData } = updatedArtwork; // Exclude index metadata

    try {
        const response = await fetch(
            `https://placeholderapi.com/api/artwork/${catalogs[catalogIndex].items[itemIndex].id}`,
            {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(artworkData),
            }
        );

        if (!response.ok) {
            throw new Error("Failed to update artwork.");
        }

        const updatedItem = await response.json();
        setCatalogs((prev) =>
            prev.map((catalog, i) =>
                i === catalogIndex
                    ? {
                        ...catalog,
                        items: catalog.items.map((item, j) =>
                            j === itemIndex ? updatedItem : item
                        ),
                    }
                    : catalog
            )
        );
        setMessage("Artwork updated successfully!");
    } catch (error) {
        setMessage(error.message || "Error: Failed to update artwork.");
    } finally {
        closeModal();
    }
    };
    */}


    const openEventDialog = () => {
        setDialogMode('create');
        setCurrentEvent({}); // Pass an empty object for new events
        setCurrentEventIndex(null); // Reset for new event
        setIsEventDialogOpen(true);
    };


    const editEvent = (index, type) => {
        setDialogMode('edit');
        setCurrentEventIndex({ index, type }); // Track index and type (upcoming or past)
        const eventToEdit = type === 'upcoming' ? upcomingEvents[index] : pastEvents[index];
        setCurrentEvent(eventToEdit);
        setIsEventDialogOpen(true);
    };

    {/* 
    const editEvent = async (index, type) => {
        try {
            const eventToEdit =
                type === 'upcoming' ? upcomingEvents[index] : pastEvents[index];
            const updatedEvent = { ...eventToEdit, ...currentEvent }; // Combine updated fields

            const response = await fetch(`/api/events/${updatedEvent.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedEvent),
            });

            if (response.ok) {
                const savedEvent = await response.json();
                const updatedEvents =
                    type === 'upcoming' ? [...upcomingEvents] : [...pastEvents];
                updatedEvents[index] = savedEvent;

                type === 'upcoming'
                    ? setUpcomingEvents(updatedEvents)
                    : setPastEvents(updatedEvents); // Update local state
            } else {
                console.error('Failed to update event:', response.statusText);
            }
        } catch (error) {
            console.error('Error updating event:', error);
        }
    };
    */}


    {/*
    const deleteEvent = async (index, type) => {
    try {
        const eventToDelete =
            type === 'upcoming' ? upcomingEvents[index] : pastEvents[index];

        const response = await fetch(`/api/events/${eventToDelete.id}`, {
            method: 'DELETE',
        });

        if (response.ok) {
            if (type === 'upcoming') {
                setUpcomingEvents((prevEvents) =>
                    prevEvents.filter((_, i) => i !== index)
                );
            } else {
                setPastEvents((prevEvents) =>
                    prevEvents.filter((_, i) => i !== index)
                );
            }
        } else {
            console.error('Failed to delete event:', response.statusText);
        }
    } catch (error) {
        console.error('Error deleting event:', error);
    }
};
    */}

    const closeEventDialog = () => {
        setIsEventDialogOpen(false);
        setCurrentEvent(null);
        setCurrentEventIndex(null);
    };

    const saveEvent = (newEvent) => {
        if (dialogMode === 'create') {
            // Add the new event to the upcomingEvents list
            setUpcomingEvents((prevEvents) => [...prevEvents, newEvent]);

            // Optionally, sort the events based on the date to keep the list ordered
            // setUpcomingEvents((prevEvents) => [...prevEvents, newEvent].sort((a, b) => new Date(a.date) - new Date(b.date)));
        } else if (dialogMode === 'edit' && currentEventIndex) {
            const updatedEvents =
                currentEventIndex.type === 'upcoming' ? [...upcomingEvents] : [...pastEvents];
            updatedEvents[currentEventIndex.index] = newEvent;

            if (currentEventIndex.type === 'upcoming') {
                setUpcomingEvents(updatedEvents);
            } else {
                setPastEvents(updatedEvents);
            }
        }

        closeEventDialog(); // Close the dialog after saving
    };

    {/* 
    const saveEvent = async (newEvent) => {
        try {
            const response = await fetch('/api/events', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newEvent),
            });

            if (response.ok) {
                const createdEvent = await response.json();
                setUpcomingEvents((prevEvents) => [...prevEvents, createdEvent]); // Update local state
            } else {
                console.error('Failed to create event:', response.statusText);
            }
        } catch (error) {
            console.error('Error creating event:', error);
        }
    };
    */}


    const updateEventLists = () => {
        const today = new Date();
        const updatedUpcoming = upcomingEvents.filter(event => new Date(event.date) >= today);
        const updatedPast = [
            ...pastEvents,
            ...upcomingEvents.filter(event => new Date(event.date) < today),
        ];

        setUpcomingEvents(updatedUpcoming);
        setPastEvents(updatedPast);
    };

    const handleChangePasswordClick = () => {
        navigate('/reset-password', { state: { isResetPassword: false } });
    };

    {/* 
    const handleSaveBankInfo = async () => {
        if (!accountHolderName || !accountNumber || !routingNumber) {
            setMessage("Error: All fields are required.");
            return;
        }

        setLoading(true);
        setMessage("");

        try {
            const response = await fetch("http://localhost:3000/api/verify-bank", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    bankName,
                    accountNumber,
                    routingNumber,
                    accountHolderName,
                }),
            });

            const data = await response.json();
            if (response.ok) {
                setMessage(`Success: ${data.message}`);
                console.log("Bank token:", data.token);
            } else {
                setMessage(`Error: ${data.error}`);
            }
        } catch (error) {
            console.error("Error:", error);
            setMessage("Error: Failed to save bank information.");
        } finally {
            setLoading(false);
        }
    };
    */}

    const handleSaveBankInfo = () => {
        // Validate that all required fields are filled
        if (!accountHolderName || !accountNumber || !routingNumber) {
            setMessage("Error: All fields are required.");
            return;
        }

        // Simulate saving bank details locally
        setMessage("Bank details saved successfully!");
        console.log("Saved Bank Details:", {
            bankName,
            accountHolderName,
            accountNumber,
            routingNumber,
        });
    };


    const renderContent = () => {
        switch (selectedOption) {
            case 'Profile Management':
                return (
                    <div className="profile-management-form">
                        <div className="form-group">
                            <label htmlFor="profile-photo">Profile Photo</label>
                            <div className="profile-photo-wrapper">
                                <img
                                    src={profileImageTemp}
                                    alt="Profile"
                                    className="profile-pic-edit"
                                />
                                <input
                                    type="file"
                                    id="profile-photo"
                                    accept="image/*"
                                    onChange={handleImageUpload}
                                    className="file-input"
                                />
                            </div>
                        </div>
                        <br></br>

                        <div className="form-group">
                            <label>Display Name</label>
                            <input
                                type="text"
                                value={artistName}
                                onChange={(e) => setArtistName(e.target.value)}
                                placeholder="Enter your display name"
                            />
                        </div>

                        <div className="form-group">
                            <label>Address Line</label>
                            <input
                                type="text"
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                                placeholder="Enter your address"
                            />
                        </div>

                        <div className="form-group">
                            <label>Current Subscription</label>
                            <input
                                type="text"
                                value={currentSubscription}
                                onChange={(e) => setCurrentSubscription(e.target.value)}
                                placeholder="Enter your current subscription"
                            />
                        </div>

                        <div className="form-group">
                            <label>Personal Public Link</label>
                            <input
                                type="text"
                                value={publicLink}
                                readOnly
                            />
                        </div>

                        {/* New Fields Added: Email Address and Contact Info */}
                        <div className="form-group">
                            <label>Email Address</label>
                            <input
                                type="email"
                                value={emailAddress}
                                onChange={(e) => setEmailAddress(e.target.value)}
                                placeholder="Enter your email address"
                            />
                        </div>

                        <div className="form-group">
                            <label>Contact Info</label>
                            <input
                                type="text"
                                value={contactInfo}
                                onChange={(e) => setContactInfo(e.target.value)}
                                placeholder="Enter your contact information"
                            />
                        </div>

                        <div className="form-group">
                            <p
                                className="change-password-link"
                                onClick={handleChangePasswordClick}
                                style={{ color: '#4A90E2', cursor: 'pointer' }}
                            >
                                Change Password
                            </p>
                        </div>


                        <div className="profile-save-button-container">
                            <button onClick={handleSave} className="profile-save-button">Save</button>
                        </div>
                    </div>
                );
            case 'My Art':
                return (
                    <div className="catalog-section">
                        {catalogs.map((catalog, index) => (
                            <div key={index} className="catalog">
                                {/* Catalog Header */}
                                <div className="catalog-header">
                                    <h3>{catalog.name}</h3>
                                    <div className="header-icons">
                                        <button
                                            className="delete-catalog-button"
                                            onClick={() => handleDeleteCatalog(index)}
                                        >
                                            <FaTrash className="icon" />
                                        </button>
                                        <button
                                            className="expand-collapse-button"
                                            onClick={() => toggleCatalog(index)}
                                        >
                                            {catalog.expanded ? <FaChevronUp className="icon" /> : <FaChevronDown className="icon" />}
                                        </button>
                                    </div>
                                </div>

                                {/* Catalog Content */}
                                {catalog.expanded && (
                                    <div className="catalog-content">
                                        <div className="catalog-items">
                                            {catalog.items.map((item, itemIndex) => (
                                                <div key={itemIndex} className="art-card">
                                                    <img
                                                        src={item.imageUrl}
                                                        alt={item.title}
                                                        className="art-image"
                                                    />
                                                    <p className="art-title">{item.title}</p>
                                                    <p className="art-price">${item.price}</p>
                                                    <div className="action-buttons">
                                                        <button
                                                            onClick={() => openModal(index, itemIndex)}
                                                            className="icon-button-edit-icon"
                                                        >
                                                            <FaPen />
                                                        </button>
                                                        <button
                                                            onClick={() => handleDeleteItem(index, itemIndex)}
                                                            className="icon-button-delete-icon"
                                                        >
                                                            <FaTrash /> {/* Ensure delete icon is visible */}
                                                        </button>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                        <button
                                            onClick={() => openModal(index)}
                                            className="add-item-button"
                                        >
                                            + Add New Art
                                        </button>
                                    </div>
                                )}
                            </div>
                        ))}

                        {/* Modal Component */}
                        {isModalOpen && (
                            <ArtworkEditModal
                                artwork={currentArtwork}
                                onSave={saveArtwork}
                                onClose={closeModal}
                            />
                        )}
                    </div>
                );
            case 'Events':
                return (
                    <div className="events-page">
                        <div className="events-header">
                            <h3>View your Events</h3>
                            <button
                                onClick={openEventDialog} className="create-event-button">
                                Create New Event
                            </button>
                        </div>

                        <div className="events-container">
                            <div className="upcoming-events-section">
                                <h3 className="section-title">Upcoming Events</h3>
                                <div className="event-cards">
                                    {upcomingEvents.map((event, index) => (
                                        <div key={index} className="event-card">
                                            <h4 className="event-title">{event.title}</h4>
                                            <p className="event-details">
                                                <strong>Date:</strong> {event.date} <br />
                                                <strong>Location:</strong> {event.location} <br />
                                                <strong>Time:</strong> {event.time} <br />
                                                <strong>Price:</strong> ${event.price}
                                            </p>
                                            <div className="event-action-buttons">
                                                <button
                                                    onClick={() => editEvent(index, 'upcoming')}
                                                    className="icon-button edit-icon"
                                                >
                                                    <FaPen />
                                                </button>
                                                <button
                                                    onClick={() => deleteEvent(index, 'upcoming')}
                                                    className="icon-button delete-icon"
                                                >
                                                    <FaTrash />
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="past-events-section">
                                <h3 className="section-title">Past Events</h3>
                                <div className="event-cards">
                                    {pastEvents.map((event, index) => (
                                        <div key={index} className="event-card">
                                            <h4 className="event-title">{event.title}</h4>
                                            <p className="event-details">
                                                <strong>Date:</strong> {event.date} <br />
                                                <strong>Location:</strong> {event.location} <br />
                                                <strong>Time:</strong> {event.time} <br />
                                                <strong>Price:</strong> ${event.price}
                                            </p>
                                            <div className="event-action-buttons">
                                                <button
                                                    onClick={() => deleteEvent(index, 'past')}
                                                    className="icon-button delete-icon"
                                                >
                                                    <FaTrash />
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {isEventDialogOpen && (
                            <ArtistEventDialog
                                onSave={saveEvent}
                                onClose={closeEventDialog}
                                event={currentEvent}
                                mode={dialogMode}
                            />
                        )}
                    </div>
                );
            case 'About Me':
                return (
                    <div className="about-me-section">
                        <div className="about-me-group">
                            <div className="about-photo-container">
                                <img
                                    src={profileImageTemp}
                                    alt="Profile"
                                    className="about-profile-photo"
                                />
                            </div>
                        </div>

                        <div className="about-me-group">
                            <label className="bio-label" htmlFor="bio-textarea">Bio</label>
                            <textarea
                                id="bio-textarea"
                                value={artistBio}
                                onChange={(e) => setArtistBio(e.target.value)}
                                placeholder="Write about yourself..."
                                rows="5"
                                className="bio-textarea"
                            />
                        </div>

                        <div className="about-me-group">
                            <label className="social-label" htmlFor="instagram-input">Instagram</label>
                            <input
                                id="instagram-input"
                                type="text"
                                placeholder="Enter Instagram handle..."
                                className="social-input"
                            />
                        </div>

                        <div className="about-me-group">
                            <label className="social-label" htmlFor="facebook-input">Facebook</label>
                            <input
                                id="facebook-input"
                                type="text"
                                placeholder="Enter Facebook profile..."
                                className="social-input"
                            />
                        </div>

                        <div className="about-me-group">
                            <label className="social-label" htmlFor="linkedin-input">LinkedIn</label>
                            <input
                                id="linkedin-input"
                                type="text"
                                placeholder="Enter LinkedIn profile..."
                                className="social-input"
                            />
                        </div>



                        <div className="save-button-container">
                            <button onClick={handleBioSave} className="about-save-button">Save</button>
                        </div>
                    </div>
                );
            case "Manage Account":
                return (
                    <div className="manage-account">
                        {/* Current Subscription */}
                        <div className="form-group">
                            <label>Current Subscription</label>
                            <div className="current-subscription">
                                <input type="text" value={currentPlan} readOnly className="subscription-input" />
                                <button
                                    onClick={() => setShowSubscriptionPlans(!showSubscriptionPlans)}
                                    className="change-button"
                                >
                                    Change
                                </button>
                            </div>
                        </div>

                        {/* Subscription Plans */}
                        {showSubscriptionPlans && (
                            <div className="subscription-plans">
                                {[
                                    { name: "Free Plan", price: "$0/month", benefits: ["Access to basic features"], value: "Free Plan" },
                                    { name: "Bronze Plan", price: "$10/month", benefits: ["Access to basic features", "Priority support"], value: "Bronze Plan" },
                                    { name: "Silver Plan", price: "$20/month", benefits: ["Access to all features", "Advanced analytics"], value: "Silver Plan" },
                                    { name: "Gold Plan", price: "$30/month", benefits: ["Access to all features", "Dedicated support", "Premium features"], value: "Gold Plan" },
                                ].map((plan) => (
                                    <div className={`subscription-card ${plan.value.toLowerCase().replace(" ", "-")}`} key={plan.value}>
                                        <div className="card-header">{plan.name}</div>
                                        <div className="price">{plan.price}</div>
                                        <ul className="benefits-list">
                                            {plan.benefits.map((benefit, index) => (
                                                <li key={index} className="benefit-item">
                                                    <span className="tick-mark">✔</span> {benefit}
                                                </li>
                                            ))}
                                        </ul>
                                        <button
                                            className={`select-plan-button ${plan.value === currentPlan ? "current-plan-button" : ""}`}
                                            onClick={() => handlePlanChange(plan.value)}
                                            disabled={plan.value === currentPlan}
                                        >
                                            {plan.value === currentPlan ? "Current" : "Select"}
                                        </button>
                                    </div>
                                ))}
                            </div>
                        )}

                        {/* Bank Information */}
                        <div className="bank-info">
                            <h2>Bank Information</h2>
                            <div className="form-group">
                                <label>Account Holder Name</label>
                                <input
                                    type="text"
                                    value={accountHolderName}
                                    onChange={(e) => setAccountHolderName(e.target.value)}
                                    placeholder="Enter account holder name"
                                />
                            </div>
                            <div className="form-group">
                                <label>Bank Name</label>
                                <input
                                    type="text"
                                    value={bankName}
                                    onChange={(e) => setBankName(e.target.value)}
                                    placeholder="Enter bank name (optional)"
                                />
                            </div>
                            <div className="form-group">
                                <label>Bank Account Number</label>
                                <input
                                    type="text"
                                    value={accountNumber}
                                    onChange={(e) => setAccountNumber(e.target.value)}
                                    placeholder="Enter account number"
                                />
                            </div>
                            <div className="form-group">
                                <label>Routing Number</label>
                                <input
                                    type="text"
                                    value={routingNumber}
                                    onChange={(e) => setRoutingNumber(e.target.value)}
                                    placeholder="Enter routing number"
                                />
                            </div>
                            <button
                                onClick={handleSaveBankInfo}
                                disabled={!accountHolderName || !accountNumber || !routingNumber || loading}
                                className="bank-save-button"
                            >
                                {loading ? "Saving..." : "Save Bank Info"}
                            </button>
                        </div>
                        {message && (
                            <p className={`message ${message.startsWith("Error") ? "error-message" : "success-message"}`}>
                                {message}
                            </p>
                        )}
                    </div>
                );
                default:
                return <p>Select an option from the left menu.</p>;
        }
    };

    const handleImageUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
            const imageUrl = URL.createObjectURL(file);
            setProfileImageTemp(imageUrl); // Update temporary profile image in Profile Management section
        }
    };

    const handleSave = () => {
        setProfileImage(profileImageTemp); // Save the temporary image to the actual profile image
        setDisplayName(artistName); // Update the artist name in the sidebar when Save is clicked
        setPopupMessage('Profile Saved Successfully!'); // Show the success message
        setTimeout(() => {
            setPopupMessage(''); // Hide the success message after 2 seconds
        }, 2000);

        console.log('Profile saved with the following details:');
        console.log({
            artistName,
            address,
            currentSubscription,
            publicLink,
        });
    };

    const handleBioSave = () => {
        setPopupMessage('Bio Saved Successfully!'); // Show the success message
        setTimeout(() => {
            setPopupMessage(''); // Hide the success message after 2 seconds
        }, 2000);

        console.log('Profile saved with the following details:');
        console.log({
            artistBio,
        });
    };

    return (
        <>
            <div className="dashboard-container">
                {/* Main Content */}
                <div className="dashboard-main">
                    {/* Left Section (Hamburger Icon for Sidebar - Mobile) */}
                    <div className="left-section">
                        <button
                            className="hamburger-menu"
                            onClick={() => setIsSidebarVisible(!isSidebarVisible)}
                        >
                            ☰
                        </button>
                    </div>

                    {/* Sidebar */}
                    {(isSidebarVisible || window.innerWidth > 768) && (
                        <nav
                            className={`dashboard-sidebar ${isSidebarVisible ? 'visible' : ''
                                }`}
                        >
                            <div className="profile-section">
                                <img
                                    src={profileImage}
                                    alt="Artist Profile"
                                    className="profile-pic"
                                />
                                <p>{displayName}</p>
                            </div>
                            <ul className="sidebar-options">
                                {[
                                    'My Art',
                                    'Events',
                                    'About Me',
                                    'Manage Account',
                                    'Analytics',
                                    'Profile Management',
                                ].map((option) => (
                                    <li
                                        key={option}
                                        className={selectedOption === option ? 'active' : ''}
                                        onClick={() => {
                                            setSelectedOption(option);
                                            if (window.innerWidth <= 768) {
                                                // Only close the sidebar on mobile screens
                                                setIsSidebarVisible(false);
                                            }
                                        }}
                                    >
                                        {option}
                                    </li>
                                ))}
                            </ul>
                            <div className="social-links">
                                <a href="#facebook" className="social-icon">FB</a>
                                <a href="#instagram" className="social-icon">IG</a>
                            </div>
                        </nav>
                    )}

                    {/* Right Section */}
                    <section className="dashboard-content">
                        <h2>{selectedOption}</h2>
                        <div className="content-area">{renderContent()}</div>
                        {popupMessage && <div className="popup-message">{popupMessage}</div>}
                    </section>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default ArtistProfilePage;
