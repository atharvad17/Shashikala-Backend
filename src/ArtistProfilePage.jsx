﻿import React, { useState } from 'react';
import './ArtistProfilePage.css';
import placeholderImage from './Images/homeScreen1.jpg';
import Footer from './Footer.jsx';
import { FaTrash, FaChevronDown, FaChevronUp, FaPen } from 'react-icons/fa';
import ArtworkEditModal from './ArtworkEditModal';
import ArtistEventDialog from './ArtistEventDialog';

const ArtistProfilePage = () => {
    const [selectedOption, setSelectedOption] = useState('My Art');
    const [profileImage, setProfileImage] = useState(placeholderImage);
    const [profileImageTemp, setProfileImageTemp] = useState(placeholderImage);
    const [artistName, setArtistName] = useState('John Doe');
    const [displayName, setDisplayName] = useState('John Doe');
    const [address, setAddress] = useState('123 Artist Street');
    const [emailAddress, setEmailAddress] = useState('abc@gmail.com');
    const [contactInfo, setContactInfo] = useState('1234567890');
    const [currentSubscription, setCurrentSubscription] = useState('Premium');
    const [publicLink, setPublicLink] = useState('www.artistprofile.com');
    const [artistBio, setArtistBio] = useState('asdasdasdasdasdasdasdasdasdasd');
    const [popupMessage, setPopupMessage] = useState('');
    const [isSidebarVisible, setIsSidebarVisible] = useState(true);
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
    const [bankName, setBankName] = useState('');
    const [accountNumber, setAccountNumber] = useState('');
    const [routingNumber, setRoutingNumber] = useState('');

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

    const handlePlanSelect = (plan) => {
        setSelectedPlan(plan.name);
        alert(`You have selected the ${plan.name} plan!`);  // Show a popup message
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

    const handleSaveItem = (updatedItem) => {
        console.log("Updated Item:", updatedItem);
        console.log("Catalog Index:", updatedItem.catalogIndex);
        console.log("Item Index:", updatedItem.itemIndex);

        setCatalogs((prev) =>
            prev.map((catalog, i) =>
                i === updatedItem.catalogIndex
                    ? {
                        ...catalog,
                        items: updatedItem.itemIndex !== null
                            ? catalog.items.map((item, j) =>
                                j === updatedItem.itemIndex ? updatedItem : item
                            )
                            : [...catalog.items, updatedItem],
                    }
                    : catalog
            )
        );
        setModalOpen(false);
    };

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
                                onChange={(e) => setPublicLink(e.target.value)}
                                placeholder="Enter your public link"
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
                                                            className="icon-button edit-icon"
                                                        >
                                                            <FaPen />
                                                        </button>
                                                        <button
                                                            onClick={() => handleDeleteItem(index, itemIndex)}
                                                            className="icon-button delete-icon"
                                                        >
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
                    <div className="profile-management-form">
                        <div className="form-group">
                            <div className="profile-photo-wrapper">
                                <img
                                    src={profileImageTemp}
                                    alt="Profile"
                                    className="profile-pic-edit"
                                />
                            </div>
                        </div>

                        <div className="form-group">
                            <label>Bio</label>
                            <textarea
                                value={artistBio}
                                onChange={(e) => setArtistBio(e.target.value)}
                                placeholder="Write about yourself..."
                                rows="5"
                                className="bio-input"
                            />
                        </div>

                        <div className="profile-save-button-container">
                            <button onClick={handleBioSave} className="profile-save-button">Save</button>
                        </div>
                    </div>
                );
            case 'Manage Account':
                return (
                    <div className="manage-account">
                        {/* Current Subscription */}
                        <div className="form-group">
                            <label>Current Subscription</label>
                            <div className="current-subscription">
                                <input
                                    type="text"
                                    value="Bronze Plan"
                                    readOnly
                                    className="subscription-input"
                                />
                                <button
                                    onClick={() => setShowSubscriptionPlans(!showSubscriptionPlans)}
                                    className="change-button"
                                >
                                    Change
                                </button>
                            </div>
                        </div>

                        <div className="subscription-plans">
                            <div className="subscription-card free">
                                <div className="card-header">Free Plan</div>
                                <div className="price">$0/month</div>
                                <ul className="benefits-list">
                                    <li>Access to basic features</li>
                                </ul>
                                <button className="select-plan-button">Select</button>
                            </div>
                            <div className="subscription-card bronze">
                                <div className="card-header">Bronze Plan</div>
                                <div className="price">$10/month</div>
                                <ul className="benefits-list">
                                    <li>Access to basic features</li>
                                    <li>Priority support</li>
                                </ul>
                                <button className="select-plan-button">Select</button>
                            </div>
                            <div className="subscription-card silver">
                                <div className="card-header">Silver Plan</div>
                                <div className="price">$20/month</div>
                                <ul className="benefits-list">
                                    <li>Access to all features</li>
                                    <li>Advanced analytics</li>
                                </ul>
                                <button className="select-plan-button">Select</button>
                            </div>
                            <div className="subscription-card gold">
                                <div className="card-header">Gold Plan</div>
                                <div className="price">$30/month</div>
                                <ul className="benefits-list">
                                    <li>Access to all features</li>
                                    <li>Dedicated support</li>
                                    <li>Premium features</li>
                                </ul>
                                <button className="select-plan-button">Select</button>
                            </div>
                        </div>


                        {/* Bank Information */}
                        <div className="bank-info">
                            <h2>Bank Information</h2>
                            <div className="bank-form-group">
                                <label>Bank Name</label>
                                <select
                                    value={bankName}
                                    onChange={(e) => setBankName(e.target.value)}
                                    className="bank-select"
                                >
                                    <option value="">Select your bank</option>
                                    <option value="Chase">Chase Bank</option>
                                    <option value="Wells Fargo">Wells Fargo</option>
                                    <option value="Bank of America">Bank of America</option>
                                    <option value="Citibank">Citibank</option>
                                </select>
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
                            <div className="bank-details-form-group">
                                <label>Routing Number</label>
                                <input
                                    type="text"
                                    value={routingNumber}
                                    onChange={(e) => setRoutingNumber(e.target.value)}
                                    placeholder="Enter routing number"
                                />
                            </div>
                            <button className="save-bank-info-button">Save Bank Info</button>
                        </div>
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
                <button
                    className="hamburger-menu"
                    onClick={() => setIsSidebarVisible(!isSidebarVisible)}
                >
                    ☰
                </button>

                <div className="dashboard-main">
                    {isSidebarVisible && (
                        <nav className="dashboard-sidebar">
                            <div className="profile-section">
                                <img
                                    src={profileImage}
                                    alt="Artist Profile"
                                    className="profile-pic" // Left section profile image
                                />
                                <p>{displayName}</p> {/* Display name in the left sidebar */}
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
                                        onClick={() => setSelectedOption(option)}
                                    >
                                        {option}
                                    </li>
                                ))}
                            </ul>

                            {/* Social Links Section */}
                            <div className="social-links">
                                <a href="#facebook" className="social-icon">FB</a>
                                <a href="#instagram" className="social-icon">IG</a>
                            </div>
                        </nav>
                    )}

                    {/* Content Section */}
                    <section className="dashboard-content">
                        <h2>{selectedOption}</h2>
                        <div className="content-area">{renderContent()}</div>
                        {popupMessage && <div className="popup-message">{popupMessage}</div>} {/* Popup message */}
                    </section>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default ArtistProfilePage;
