import React, { useState } from 'react';
import './ArtistProfilePage.css';
import placeholderImage from './Images/homeScreen1.jpg'; // Placeholder image
import Footer from './Footer.jsx';

const ArtistProfilePage = () => {
    const [selectedOption, setSelectedOption] = useState('My Art');
    const [profileImage, setProfileImage] = useState(placeholderImage); // Profile image for the sidebar (left)
    const [profileImageTemp, setProfileImageTemp] = useState(placeholderImage); // Temporary profile image for Profile Management section
    const [artistName, setArtistName] = useState('John Doe'); // Default name for display
    const [displayName, setDisplayName] = useState('John Doe'); // Separate state for displaying name in the sidebar
    const [address, setAddress] = useState('123 Artist Street'); // Default address
    const [currentSubscription, setCurrentSubscription] = useState('Premium'); // Default subscription
    const [publicLink, setPublicLink] = useState('www.artistprofile.com'); // Default public link
    const [popupMessage, setPopupMessage] = useState('');

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

                        <div className="profile-save-button-container">
                            <button onClick={handleSave} className="profile-save-button">Save</button>
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
        // Save the profile image and artist name when Save button is clicked
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

    return (
        <>
            <div className="dashboard-container">
                <div className="dashboard-main">
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
                                'Contact Us',
                                'About Us',
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
