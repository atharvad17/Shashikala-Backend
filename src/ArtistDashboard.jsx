import React, { useState } from 'react';
import './ArtistDashboard.css';
import profileImage from './Images/homeScreen1.jpg'; // Replace with actual profile image path
import ArtworkGallery from './ArtworkGallery';
import { FaPen } from 'react-icons/fa';
import Footer from './Footer';

const ArtistDashboard = () => {
    const [isEditingAbout, setIsEditingAbout] = useState(false);
    const [isEditingArtwork, setIsEditingArtwork] = useState(false);
    const [aboutText, setAboutText] = useState("Hello, I'm [Artist's Name]! I'm a visual artist specializing in contemporary artwork. Here, I showcase some of my work for sale. Take a look and reach out if you’re interested!");
    const [profileImg, setProfileImg] = useState(profileImage);

    const toggleEditingAbout = () => setIsEditingAbout(!isEditingAbout);
    const toggleEditingArtwork = () => setIsEditingArtwork(!isEditingArtwork);

    const handleAboutChange = (e) => setAboutText(e.target.value);

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => setProfileImg(reader.result);
            reader.readAsDataURL(file);
        }
    };

    const handleImageDelete = () => setProfileImg(null);

    const saveAboutSection = () => setIsEditingAbout(false);
    const saveArtworkSection = () => setIsEditingArtwork(false);

    return (
        <>
        <div className="dashboard-container">
            {/* Profile Section */}
            <div className="profile-section">
                <div className="section-header">
                    <h2>About Me</h2>
                    <FaPen className="edit-icon" onClick={toggleEditingAbout} />
                </div>
                <div className="profile-content">
                    <div className="profile-image-container">
                        <img src={profileImg || profileImage} alt="Artist Profile" className="profile-image" />
                        {isEditingAbout && (
                            <div className="image-controls">
                                <label className="upload-button">
                                    Upload
                                    <input type="file" onChange={handleImageUpload} style={{ display: 'none' }} />
                                </label>
                                <button className="delete-button" onClick={handleImageDelete}>Delete</button>
                            </div>
                        )}
                    </div>
                    {isEditingAbout ? (
                        <textarea
                            value={aboutText}
                            onChange={handleAboutChange}
                            className="about-textarea"
                            style={{ height: '150px', width: '100%' }}
                        />
                    ) : (
                        <p>{aboutText}</p>
                    )}
                    {isEditingAbout && (
                        <button className="save-button" onClick={saveAboutSection}>
                            Save
                        </button>
                    )}
                </div>
            </div>

            {/* Artwork Section */}
            <div className="artwork-section">
                <div className="section-header">
                    <h2>My Artwork</h2>
                    <FaPen className="edit-icon" onClick={toggleEditingArtwork} />
                </div>
                <div className="artwork-gallery">
                    <ArtworkGallery isEditing={isEditingArtwork} />
                    {isEditingArtwork && (
                        <button className="save-button artwork-save-button" onClick={saveArtworkSection}>
                            Save
                        </button>
                    )}
                </div>
            </div>
            </div>
            <Footer />
        </>
    );
};

export default ArtistDashboard;
